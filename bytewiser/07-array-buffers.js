var u32 = new Uint32Array(1);
u32[0] = parseInt(process.argv[2], null);
var u16 = new Uint16Array(u32.buffer);
console.log(JSON.stringify(u16));
