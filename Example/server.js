let http = require('http');

let fs = require('fs');

http.createServer((req, res)=>{
    res.writeHead(200, {"Content-Type": "text-plain"});
    res.end('Hello world!');

    // res.writeHead(200, {"Content-Type": "iamge/jpeg"});
    // fs.createReadStream('../source/xf_chen.jpeg').pipe(res);
}).listen(4000);

console.log(process.argv.splice(2), 'Server running in port 4000!');