
let EventEmitter = require('events');
let fs = require('fs');
let watchDir = './watch';
let processedDir = './done';

class Watcher extends EventEmitter {
    write(data) {
        this.emit('data', data);
    }
}

const Watch = new Watcher();

Watch.on('data', (data) => {
    console.log(`Get Data: "${data}"`);
});
// Watch.write(`Use ES6!`);

Watch.on('process', (file) => {
    let watchFile = watchDir + '/' + file;
    let processedFile = processedDir + '/' + file.toLowerCase();

    fs.rename(watchFile, processedFile, (err) => {
        if(err) throw err;
    })
})

Watch.watch = function(){
    let watcher = this;
    fs.readdir(watchDir, (err, files) => {
        if(err) throw err;
        for(let index in files){
            watcher.emit('process', files[index]);
        }
    })
}

Watch.start = function(){
    let watcher = this;
    fs.watchFile(watchDir, () => {
        watcher.watch();
    })
}

Watch.start();

/**
 * 用匿名函数的值保留全局变量
 * @param {*} callback
 */
function asyncF(callback) {
    setTimeout(callback, 200);
}
var color = 'blue';
(function(color){   //嵌套一层匿名函数以 保留值

    asyncF(()=>{
        console.log(`The color is ${color}`);
    })

})(color);
color = 'green';