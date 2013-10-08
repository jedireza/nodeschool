var level = require('level');
var db = level(process.argv[2]);
var obj = JSON.parse(process.argv[3]);
for (var prop in obj) {
  if(obj.hasOwnProperty(prop)){
    db.put(prop, obj[prop], function (err) {
      if (err) {
        throw err;
      }
    });
  }
}
