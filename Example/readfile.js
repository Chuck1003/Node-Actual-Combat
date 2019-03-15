let fs = require('fs');

fs.readFile('../json/resource.json', 'utf-8', (err, data)=>{    //异步编程，同步执行完后执行回调方法！
    if(!err){
        console.log(data);
    }else {
        console.error(err);
    }
})
console.log(333)