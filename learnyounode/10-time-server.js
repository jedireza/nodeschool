var moment = require('moment');
var net = require('net');
var server = net.createServer(function (socket) {
  socket.write(moment().format('YYYY-MM-DD HH:mm') +'\n');
  socket.end();
})
server.listen(8000);
