var EventEmitter = require('events').EventEmitter;

let chanel = new EventEmitter();
chanel.on('join', ()=>{
    console.log('welcome!');
})

chanel.emit('join');