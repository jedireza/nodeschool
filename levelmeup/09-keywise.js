var level = require('level');
var db = level(process.argv[2], { valueEncoding: 'json' });
var json = require(process.argv[3]);
json.forEach(function(entry) {
  if (entry.type === 'user') {
    db.put(entry.name, entry);
  }
  else if (entry.type === 'repo') {
    db.put(entry.user +'!'+ entry.name, entry);
  }
});
