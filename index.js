'use strict';

var path = require('path');

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
      engine.run(
        'kalabox/rsync:stable',
        cmd,
        {
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
        name: 'kalabox/rsync:stable',
        build: false,
        src: ''
      };
      if (globalConfig.profile === 'dev') {
        opts.build = true;
        opts.src = path.resolve(
          __dirname,
          'dockerfiles',
          'rsync',
          'Dockerfile'
        );
      }
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
        var cmd = this.argv;
        runRsyncCMD(cmd, done);
      };
    });

  });

};
