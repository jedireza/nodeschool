var http = require('http'),
    url = process.argv[2];

http.get(url, function(res) {
  res.on('data', function(data) {
    console.log(data.toString());
  });
});
