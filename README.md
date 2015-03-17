# Kalabox Plugin Rsync

A simple plugin to let you run rsync commands on your apps. This plugin will also forward in and load your ssh key so you can pull files that are key-protected.

## Installation

You can install this plugin by going into your app directory and running the normal

```
npm install kalabox-plugin-rsync --save
```

In order for your app to use the plugin you will also need to inform the app of its existence. This can be done in the `kalabox.json` file in your app root. Just add the plugin name to the `appPlugins` key.

```json
{
  "appName": "drupal7",
  "appPlugins": [
    "my-hot-plugin",
    "kalabox-plugin-dbenv",
    "kalabox-plugin-git",
    "kalabox-plugin-rsync"
  ],
}

```

## Usage

Run any rsync command you normally would but start it with `kbox`. Run it from inside directory that contains the app you want to run it against or pass in the appname first if you are outside that directory like `kbox appname rysnc ...`.

Examples

```
# Returns the version of git, must run from a directory that contains a kalabox app
kbox git version

# Clones a repo into /data for a D7 app
kbox pressflow7 git clone http://github.com/kalamuna/playbox.git ./

# Pulls down the latest code, must run from a directory that contains a kalabox app
kbox git pull
```

## Other Resources

* [API docs](http://api.kalabox.me/)
* [Test coverage reports](http://coverage.kalabox.me/)
* [Kalabox CI dash](http://ci.kalabox.me/)
* [Mountain climbing advice](https://www.youtube.com/watch?v=tkBVDh7my9Q)
* [Boot2Docker](https://github.com/boot2docker/boot2docker)
* [Syncthing](https://github.com/syncthing/syncthing)
* [Docker](https://github.com/docker/docker)

-------------------------------------------------------------------------------------
(C) 2015 Kalamuna and friends


