'use strict';

var path = require('path');
var _ = require('lodash');

var PLUGIN_NAME = 'kalabox-plugin-rsync';

module.exports = function(kbox) {

  var events = kbox.core.events;
  var engine = kbox.engine;
  var globalConfig = kbox.core.deps.lookup('globalConfig');

  kbox.whenApp(function(app) {

    /**
     * Runs a git command on the app data container
     **/
    var runRsyncCMD = function(cmd, done) {
      // Run the git command in the correct directory in the container if the
      // user is somewhere inside the code directory on the host side.
      // @todo: consider if this is better in the actual engine.run command
      // vs here.
      var workingDirExtra = '';
      var cwd = process.cwd();
      var codeRoot = app.config.codeRoot;
      if (_.startsWith(cwd, codeRoot)) {
        workingDirExtra = cwd.replace(codeRoot, '');
      }
      var workingDir = '/code' + workingDirExtra;

      engine.run(
        'rsync',
        cmd,
        {
          WorkingDir: workingDir,
          Env: [
            'APPNAME=' +  app.name,
            'APPDOMAIN=' +  app.domain
          ],
          HostConfig: {
            VolumesFrom: [app.dataContainerName]
          }
        },
        {
          Binds: [app.config.homeBind + ':/ssh:rw']
        },
        done
      );
    };

    // Events
    // Install the util container for our things
    events.on('post-install', function(app, done) {
      // If profile is set to dev build from source
      var opts = {
        name: 'rsync',
        srcRoot: path.resolve(__dirname)
      };
      engine.build(opts, done);
    });

    // Tasks
    // git wrapper: kbox git COMMAND
    kbox.tasks.add(function(task) {
      task.path = [app.name, 'rsync'];
      task.description = 'Run rsync commands.';
      task.kind = 'delegate';
      task.func = function(done) {
        // We need to use this faux bin until the resolution of
        // https://github.com/syncthing/syncthing/issues/1056
        var cmd = this.payload;
        runRsyncCMD(cmd, done);
      };
    });

  });

};
