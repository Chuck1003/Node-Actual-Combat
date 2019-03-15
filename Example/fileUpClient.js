var socket = io.connect();

$(document).ready(function() {

    socket.on('data', function(data) {
      console.log('上传进度：', data + '%');
    });

});