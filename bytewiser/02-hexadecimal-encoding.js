var bytes = process.argv.slice(2);
console.log(new Buffer(bytes).toString('hex'));
