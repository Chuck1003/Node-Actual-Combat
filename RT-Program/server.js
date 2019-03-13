let http = require('http');
let fs = require('fs');
let mime = require('mime');
let path = require('path');

var cache = {};

// 辅助函数
function send404(res){
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("ERROE 404: resource not find!");
    res.end();
}
function sendFile(res, filePath, fileContents){     //返回静态文件，放在内存中
    res.writeHead(200, {"Content-Type": mime.getType(path.basename(filePath))});
    res.end(fileContents);
}
function serverStatic(res, cache, absPath){         //静态文件服务
    if(cache[absPath]){
        sendFile(res, absPath, cache[absPath]);
    }else{
        fs.exists(absPath, (exists)=>{
            if(exists){
                fs.readFile(absPath, (err, data)=>{
                    if(!!err){
                        send404(res);
                    }else{
                        cache[absPath] = data;
                        sendFile(res, absPath, data);
                    }
                })
            }else{
                send404(res);
            }
        })
    }
}

// 创建服务器
var server = http.createServer((req, res)=>{
    let filePath = false;

    if(req.url == '/'){
        filePath = 'client/index.html';
    }else if(/socket/.test(req.url)){
        filePath = 'client/socket.io.js'
    }else{
        filePath = 'client' + req.url;
    }

    let absPath = './' + filePath;
    serverStatic(res, cache, absPath);
}).listen(3030,()=>{console.log('server running in port 3030!')});


var chatServer = require('./server/chat_server');
chatServer.listen(server);