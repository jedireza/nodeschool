module.exports = function(db, date, callback) {
  var tweets = [];
  db.createReadStream({ start: date, end: date +'\xff' })
    .on('error', function (err) {
      callback(err);
    })
    .on('data', function(data){
      tweets.push(data.value);
    })
    .on('end', function() {
      callback(null, tweets);
    })
  ;
};
