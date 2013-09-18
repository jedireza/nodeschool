var http = require('http'),
    fs = require('fs');

var server = http.createServer(function (req, res) {
  var file = fs.createReadStream(process.argv[2]);
  file.pipe(res);
})
server.listen(8000);
