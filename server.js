// const express = require('express')
// const app = express()
// const server = require('http').Server(app)
// const io = require('socket.io')(server)
// const { v4: uuidV4 } = require('uuid');

// app.set('view engine', 'ejs');
// app.use(express.static('public'))
 
// app.get('/', (req, res) => {
//     res.redirect(`/${uuidV4()}`)
// })

// app.get('/:room', (req, res) => {
//     res.render('room', { roomId: req.params.room })
// })

// io.on('connection', socket => {
//     socket.on('join-room', (roomId, userId) => {
//         console.log(roomId, userId)
//     })
// })

// server.listen(5000);


//====================================================================================================================================

const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || "3000";
/* 1a. We need to require our PeerServer */
const { ExpressPeerServer } = require('peerjs-server');


/* 1b. We want to make sure we've created our peer server, which will
* handle the signalling between peers. */
const peerServer = ExpressPeerServer(server, {
    proxied: true,
    debug: true,
    path: '/myapp',
    ssl: {}
});

/* 1c. We want to ensure that we're using the peerServer in our app.*/
app.use(peerServer);

app.use(express.static(path.join(__dirname)));

app.get("/InCall", (request, response) => {
    response.sendFile(__dirname + "/public/index.html");
    // response.redirect(`/`);
});

server.listen(port);
console.log('Listening on: ' + port);