module.exports = function(dir, ext, cb) {
  var fs = require('fs'),
      ext = '.' + ext;
  
  fs.readdir(dir, function(err, list) {
    if (err) {
      return cb(err);
    }
    
    var results = [];
    list.forEach(function(item) {
      if (item.indexOf(ext) > -1) {
        results.push(item);
      }
    });
    
    cb(null, results);
  });
};
