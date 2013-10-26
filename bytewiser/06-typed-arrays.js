var uarr;
process.stdin.once('data', function(buffr) {
  uarr = new Uint8Array(buffr.length);
  for (var i = 0 ; i < buffr.length ; i++) {
    uarr[i] = buffr[i];
  }
});
process.stdin.on('end', function(buffr) {
  console.log(JSON.stringify(uarr));
});
