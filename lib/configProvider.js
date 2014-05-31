/**
 * Getter/setter for the config file
 */


/**
 * Module dependencies
 * */
var fs = require('fs');
var userHome = require('./userHome');
var configFilePath = userHome() + '/.nrsrc';
var config;

try {
  config = JSON.parse(fs.readFileSync(configFilePath).toString());
} catch (err) {
  config = null;
}

/**
 * @method get
 */
module.exports.get = function () {
  return config ? config : {};
};

/**
 * @method save
 */
module.exports.set = function (_config) {
  config = _config;
  try {
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
  } catch (err) {

  }
};
