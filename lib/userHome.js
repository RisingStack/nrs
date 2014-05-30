module.exports = function () {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
};
