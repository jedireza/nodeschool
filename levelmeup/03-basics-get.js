var level = require('level');
var db = level(process.argv[2]);
var goGetIt = function(key) {
  db.get(key, function(err, val) {
    if (err && err.notFound) {
      return;
    }
    console.log(key +'='+ val);
  });
};
for (var i = 0 ; i < 101 ; i++) {
  var key = 'gibberish'+ i;
  goGetIt(key);
}
