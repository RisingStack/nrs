/**
 * Getter/setter for the config file
 * @module configProvider
 */

/**
 * Module dependencies
 * */
var fs = require('fs');
var userHome = require('./userHome');
var configFilePath = userHome() + '/.nrsrc';
var defaultConfig = require('./defaultRepositories.json');

var config;
var createConfig;
var set;
var get;
var restore;

/**
 * @method createConfig
 */
createConfig = function () {
  set(defaultConfig);
};

/**
 * @method get
 */
get = function () {
  return config ? config : {};
};

/**
 * @method set
 */
set = function (_config) {
  config = _config;
  try {
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
};

/**
 * @method restore
 */
restore = function () {
  set(defaultConfig);
};

try {
  config = JSON.parse(fs.readFileSync(configFilePath).toString());
} catch (err) {
  if (err.code === 'ENOENT') {
    createConfig();
    get();
  } else {
    console.log(err);
    process.exit(-1);
  }
}

module.exports.set = set;
module.exports.get = get;
module.exports.restore = restore;
