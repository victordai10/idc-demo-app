const { PeerServer } = require("peer");

const peerServer = PeerServer({ 
    port: 9000, 
    path: "/myapp" 
});

peerServer.on('connection', (client) => {
    console.log('Client connected:', client.getId());
});

peerServer.on('disconnect', (client) => {
    console.log('Client disconnected:', client.getId());
});

// const express = require("express");
// const http = require("http");
// const path = require("path");
// const app = express();
// const server = http.createServer(app);
// const { ExpressPeerServer } = require("peer");
// const port = process.env.PORT || "8000";

// const peerServer = ExpressPeerServer(server, {
//   proxied: true,
//   debug: true,
//   path: "/myapp",
//   ssl: {},
// });

// app.use(peerServer);

// app.use(express.static(path.join(__dirname)));

// app.get("/", (request, response) => {
//   response.sendFile(`${__dirname}/index.html`);
// });

// server.listen(port);
// console.log(`Listening on: ${port}`);
