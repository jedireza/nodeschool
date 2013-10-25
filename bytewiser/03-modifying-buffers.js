process.stdin.on('data', function(buffr) {
  for (var i = 0 ; i < buffr.length ; i++) {
    if (buffr[i] === 46) {
      buffr.write('!', i);
    }
  }
  console.log(buffr);
});
