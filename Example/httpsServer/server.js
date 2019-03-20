let https = require('https');
let fs = require('fs');

let options = {
    key: fs.readFileSync('./ryans-key.pem'),
    cert: fs.readFileSync('./ryans-cert.pem')
}

https.createServer(options, (req, res)=> {
    res.writeHead(200);
    res.end('Hello World!');
}).listen(8000);
console.log('server running at https://localhost:8000')