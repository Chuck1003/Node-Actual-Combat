let redis = require('redis');

let redisClient = function(req, res, next) {
        // let client = redis.createClient(8090, '127.0.0.1');
        // client.on('error', (err)=> {
        //     console.warn('Error: ', err);
        // })

        // client.set('color', 'red', redis.print);
        // client.get('color', function(err, value) {
        // if (err) throw err;
        // console.log('Got: ' + value);
        // });

        // client.hmset('camping', {
        //     'shelter': '2-person tent',
        //     'cooking': 'campstove'
        // }, redis.print);

        // client.hget('camping', 'cooking', function(err, value) {
        //     if (err) throw err;
        //     console.log('Will be cooking with: ' + value);
        // });

        // client.hkeys('camping', function(err, keys) {
        //     if (err) throw err;
        //     keys.forEach(function(key, i) {
        //         console.log(' ' + key);
        //     });
        // });

        // client.lpush('tasks', 'Paint the bikeshed red.', redis.print);
        // client.lpush('tasks', 'Paint the bikeshed green.', redis.print);

        // client.lrange('tasks', 0, -1, function(err, items) {
        // if (err) throw err; items.forEach(function(item, i) {
        //     console.log(' ' + item); });
        // });

    console.log('TTT^^TTT');
    next();
}

module.exports = redisClient;