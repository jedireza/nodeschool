module.exports = {
  init: function(db, words, callback) {
    var batchCommands = [];
    words.forEach(function(word) {
      batchCommands.push({
        type: 'put', key: word.length + word, value: word
      });
    });
    db.batch(batchCommands, function(err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  },
  query: function(db, word, callback) {
    var start = word.length + word.replace(/\*/g, 'A');
    var end = word.length + word.replace(/\*/g, 'Z');
    var results = [];
    db.createReadStream({ start: start, end: end })
      .on('error', function (err) {
        callback(err);
      })
      .on('data', function(data){
        results.push(data.value);
      })
      .on('end', function() {
        callback(null, results);
      })
    ;
  }
};
