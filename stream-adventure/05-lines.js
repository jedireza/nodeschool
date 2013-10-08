var through = require('through');
var split = require('split');
var lineNum = 1;
var tr = through(function(buf) {
  if (lineNum % 2 === 0) {
    this.emit('data', buf.toString().toUpperCase() +'\n');
  }
  else {
    this.emit('data', buf.toString().toLowerCase() +'\n');
  }
  lineNum += 1;
});
process.stdin.pipe(split()).pipe(tr).pipe(process.stdout);
