var duplexer = require('duplexer');
var spawn = require('child_process').spawn;

module.exports = function (cmd, args) {
  var child = spawn(cmd, args);
  return duplexer(child.stdin, child.stdout);
};
