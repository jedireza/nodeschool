var fs = require('fs'),
    dir = process.argv[2],
    ext = '.' + process.argv[3];

fs.readdir(dir, function(err, list) {
  list.forEach(function(item) {
    if (item.indexOf(ext) > -1) {
      console.log(item);
    }
  });
});
