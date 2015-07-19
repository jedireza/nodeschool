var bindings = require('bindings');
var addon = bindings('myaddon');

console.log(addon.length(process.argv[2]));
