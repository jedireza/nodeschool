var fs = require('fs');
fs.open(process.argv[2], 'r', function(err, fd) {
  fs.fstat(fd, function(err, stats) {
    fs.read(fd, new Buffer(stats.size), 0, stats.size, 0, function(err, bytesRead, buffr) {
      var sliceFrom = 0;
      for (var i = 0 ; i < buffr.length ; i++) {
        if (buffr[i] === 10) {
          console.log(buffr.slice(sliceFrom, i));
          sliceFrom = i + 1;
        }
      }
      console.log(buffr.slice(sliceFrom));
    });
    fs.close(fd);
  });
});
