var through = require('through');
var trumpet = require('trumpet');
var tr = trumpet();
var stream = tr.select('.loud').createStream();
var th = through(function(buf) {
  this.emit('data', buf.toString().toUpperCase());
});
process.stdin.pipe(tr).pipe(process.stdout);
stream.pipe(th).pipe(process.stdout);
