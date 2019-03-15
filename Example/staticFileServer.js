let http = require('http');
let parse = require('url').parse;
let join = require('path').join;
let fs = require('fs');

let root = __dirname;

http.createServer((req, res) => {
    let url = parse(req.url);
    let path = join(root, url.pathname);

    /**检查文件是否存在 */
    fs.stat(path, (err, stat)=>{
        if(err){
            if('ENOENT' === err.code){
                res.statusCode = 404;
                res.end('Not Found');
            }else {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        }else{
            res.setHeader('Content-Length', stat.size);

            let stream = fs.createReadStream(path);
            // stream.on('data', (chunk)=>{
            //     res.write(chunk);
            // })
            // stream.on('end', ()=>{
            //     res.end();
            // })
            res.setHeader('Content-Type', 'text/plain; charset="utf-8');
            /**流的概念，从前往后流 */
            stream.pipe(res);       // res.end() 会在stream.pipe()内部调用
            /**有了外面一层判断文件是否存在之后，error判断可以不要了 */
            stream.on('error', (err)=>{
                res.statusCode = 500;
                res.end('Internal Server Error')
            })

        }

    })
}).listen(3040);