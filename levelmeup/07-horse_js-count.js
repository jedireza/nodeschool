module.exports = function(db, date, callback) {
  var count = 0;
  db.createReadStream({ start: date })
    .on('error', function (err) {
      callback(err);
    })
    .on('data', function(data){
      count += 1;
    })
    .on('end', function() {
      callback(null, count);
    })
  ;
};
