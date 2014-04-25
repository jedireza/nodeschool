var http = require('http'),
    moment = require('moment'),
    map = require('through2-map'),
    url = require('url'),
    fs = require('fs');

var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  
  var urlParts = url.parse(req.url, true);
  var thisMoment = new moment(urlParts.query.iso);
  
  if ('/api/parsetime' === urlParts.pathname) {
    res.write(JSON.stringify({
      'hour': parseInt(thisMoment.format('H'), null),
      'minute': parseInt(thisMoment.format('mm'), null),
      'second': parseInt(thisMoment.format('ss'), null)
    }));
    res.end();
  }
  else if ('/api/unixtime' === urlParts.pathname) {
    res.write(JSON.stringify({
      'unixtime': thisMoment._d.getTime()
    }));
    res.end();
  }
  else {
    res.end();
  }
})
server.listen(process.argv[2]);
