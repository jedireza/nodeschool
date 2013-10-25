var buffers = [];
var bufflen = 0;
process.stdin.on('data', function(buffr) {
  buffers.push(buffr);
  bufflen += buffr.length;
});
process.stdin.on('end', function(buffr) {
  console.log(Buffer.concat(buffers, bufflen));
});
