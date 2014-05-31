/**
 * Returns the home folder of the user
 * @module userHome
 */
module.exports = function () {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
};
