const express = require('express');
const { createServer } = require('node:http'); 

//node:http prefix is a convention to distinguish core modules from third-party packages and helps avoid ambiguity.
//createServer function from the node:http module. The createServer function is used to create an HTTP server.
//we could have gone with the methods provided express but here we might need more control over http server or need to integrate additonal
// feature so the imprprt of node:https

const {join} = require('node:path'); //this is to genertate the path.
const { Server } = require('socket.io');

//Notice that a new instance of socket.io by passing the server (the HTTP server) object. Then I listen on the connection event 
//for incoming sockets and log it to the console.
const app = express();
const server = createServer(app);
const io = new Server(server);



app.get('/', (req, res) => {
  res.sendFile(join(__dirname,'index.html'))
});

/**
 * 
 * incase if it had sub directories like this:
/myapp
  |-- app.js
  |-- public
       |-- index.html

 res.sendFile(path.join(__dirname, 'public', 'index.html'));
*/


io.on('connection', (socket) => {

    socket.emit("hello","world");

    socket.on('chat message', (msg) => {
      io.emit('chat message',msg)
    });

  });



//he main idea behind Socket.IO is that you can send and receive any events you want, with any data you want. Any objects that can be encoded as JSON will do, and binary data is supported too.

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});



//YOU CAN ALSO RUN A CODE WITH node index.js