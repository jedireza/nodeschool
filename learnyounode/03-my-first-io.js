var fs = require('fs');
var contents = fs.readFileSync(process.argv[2], 'utf8');
var lines = contents.split('\n');
console.log(lines.length - 1);
