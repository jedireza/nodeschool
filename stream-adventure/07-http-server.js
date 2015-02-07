var through = require('through');
var http = require('http');
var fs = require('fs');

var write = function(buf) {
  this.queue(buf.toString().toUpperCase());
};
var end = function(buf) {
  this.queue(null);
};

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(through(write, end)).pipe(res);
  }
});
server.listen(process.argv[2]);
