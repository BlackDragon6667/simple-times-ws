const express = require('express');
const http = require('http');
const WebSocket = require('ws');

//process.env.PORT is something a lot of hosting applications use
//otherwise it will be at localhost:3000 (if you're doing it locally)
const port = process.env.PORT || 3000;


//Creating the http server
const server = http.createServer(express);

server.listen(port, function(){
  console.log(`Server is listening on ${port}!`)
})

//Creating the web socket server through the http server
const wss = new WebSocket.Server({ server })

//websocket functions
wss.on('connection', (ws) => {
  //using the ws on the server
  console.log("Client has connected");
  ws.on('close', () => console.log("Client has disconnected"));
})