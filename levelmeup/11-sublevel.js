var level = require('level');
var sub = require('level-sublevel');
var db = sub(level(process.argv[2]));
var robots = db.sublevel('robots');
var dinosaurs = db.sublevel('dinosaurs');
dinosaurs.put('slogan', 'rawr');
robots.put('slogan', 'beep boop');
