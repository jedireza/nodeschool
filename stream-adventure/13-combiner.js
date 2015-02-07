var through = require('through');
var combine = require('stream-combiner');
var split = require('split');
var zlib = require('zlib');

module.exports = function () {
  var currentGenre;

  var setNewGenre = function () {
    currentGenre = {
      name: '',
      books: []
    };
  };

  var write = function(obj) {
    if (!obj) {
      this.queue(JSON.stringify(currentGenre) + '\n');
      return;
    }

    var json = JSON.parse(obj);

    if (json.type === 'genre') {
      if (!currentGenre) {
        setNewGenre();
        currentGenre.name = json.name;
        currentGenre.books = [];
      }
      else {
        this.queue(JSON.stringify(currentGenre) + '\n');
        setNewGenre();
        currentGenre.name = json.name;
        currentGenre.books = [];
      }
    }
    else {
      currentGenre.books.push(json.name);
    }
  };

  var end = function () {
    this.queue(null);
  };

  return combine(
    split(),
    through(write, end),
    zlib.createGzip()
  );
};
