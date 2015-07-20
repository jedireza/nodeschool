var bindings = require('bindings');
var addon = bindings('myaddon');

addon.delay(process.argv[2], function () {
  console.log('Done!');
});
