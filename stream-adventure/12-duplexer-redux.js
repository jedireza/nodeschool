var through = require('through');
var duplexer = require('duplexer');
var spawn = require('child_process').spawn;

module.exports = function (counter) {
  var countryCounts = {};
  var write = function(obj) {
    if (countryCounts.hasOwnProperty(obj.country)) {
      countryCounts[obj.country] += 1;
    }
    else {
      countryCounts[obj.country] = 1;
    }
    this.queue(obj);
  };
  var end = function(buf) {
    counter.setCounts(countryCounts);
    this.queue(null);
  };

  return duplexer(through(write, end), counter);
};
