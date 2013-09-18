var http = require('http'),
    bl = require('bl');

var callQ = 0;
var responses = {};
var done = function(idx, data) {
  callQ += 1;
  responses[idx] = data;
  
  if (callQ === 3) {
    console.log(responses['0']);
    console.log(responses['1']);
    console.log(responses['2']);
  }
};
var makeRequest = function(idx, url, done) {
  http.get(url, function(res) {
    var response = '';
    res.pipe(bl(function(err, data) {
      response += data;
    }));
    res.on('end', function() {
      done(idx, response.replace(/\n/g, ''));
    });
  });
};

makeRequest('0', process.argv[2], done);
makeRequest('1', process.argv[3], done);
makeRequest('2', process.argv[4], done);
