var crypto = require('crypto');
var cryptStream = crypto.createDecipher(process.argv[2], process.argv[3]);
var zlib = require('zlib').createGunzip();
var parser = require('tar').Parse();

parser.on('entry', function (e) {
  if (e.type === 'File') {
    var shasum = crypto.createHash('md5', { encoding: 'hex' });
    e.on('data', function(d) {
      shasum.update(d);
    });
    e.on('end', function() {
      var d = shasum.digest('hex');
      console.log(d +' '+ e.path);
    });
  }
});

process.stdin.pipe(cryptStream).pipe(zlib).pipe(parser);
