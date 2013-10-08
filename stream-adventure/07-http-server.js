var through = require('through');
var http = require('http');
var fs = require('fs');
var tr = through(function(buf) {
  this.emit('data', buf.toString().toUpperCase());
});
var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(tr).pipe(res);
  }
});
server.listen(8000);
