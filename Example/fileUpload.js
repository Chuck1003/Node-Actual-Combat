let http = require('http');
let formidable = require('formidable');
let socketio = require('socket.io');
let io;

let server = http.createServer((req, res)=> {
    switch(req.method) {
        case 'GET':
            show(req, res);
            break;

        case 'POST':
            upload(req, res);
            break;
    }
}).listen(3040);

io = socketio(server);

function show(req, res) {
    let html = ''
    + '<form method="post" action="/" enctype="multipart/form-data">'
    + '<p><input type="text" name="name" /></p>'
    + '<p><input type="file" name="file" /></p>'
    + '<p><input type="submit" value="Upload" /></p>'
    + '<script src="./socket.io.js"></script>'
    + '<script src=".fileUpClient.js"></script>'
    + '</form>';

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-length', Buffer.byteLength(html));
    res.end(html);
}

/** 调用formidable模块功能实现上传 */
function upload(req, res) {
    if(!isFormData(req)){
        res.statuCode = 400;
        res.end('Bad Request: expecting multipart/form-data');
        return;
    }

    let form = new formidable.IncomingForm();
    /**IncomingForm对象事件 集成到下面 parse的回调中 */
    // form.on('field', (field, value)=> { //输入
    //     console.log(field, value);
    // })
    // form.on('file', (name, file)=> { //文件
    //     console.log(name, file);
    // })
    // form.on('end', ()=> {
    //     res.end('upload complete');
    // })
    form.on('progress', (bytesReceived, bytesExpected)=> {
        let percent = Math.floor(bytesReceived / bytesExpected * 100);
        console.log('上传进度：', percent);
    })
    /**课后练习，将进度条回传到浏览器。提示：WebSocket协议 or Socket.IO实时模块 */

    form.parse(req, (err, fields, files)=> {
        console.log('输入、文件以及结束上传：', fields, files);
        res.end('upload complete!');
    });
}
function isFormData(req) {
    let type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data');
}