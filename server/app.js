var express = require('express');
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
const cors = require("cors");
const logger = require("morgan");
// var index = require('./routes/index');

app.get("/", function(req, res) {
    // res.sendFile(__dirname + "/Users/susanwen/Desktop/Hactiv8/p2/w3/2/real-time-chat/server");
    res.send('success')
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/', index);


io.on("connection", function(socket) {
	console.log("a user connected");
    
    socket.on("disconnect", function() {
        console.log("user disconnected");
    });

    //chat message adl event , msg adl datan
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg); //<====jika mau semua dapat pesannya
        // socket.broadcast.emit('chat message', msg); // <===jika mau KECUALI diri sendiri tidak dapat pesannya
    });
});

http.listen(3030, function() {
	console.log("listening on *:3030");
});
