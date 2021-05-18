const express = require('express');
const http = require('http');
const WebSocket = require('ws');

//You can use whatever port you want here
//process.env.PORT is something a lot of hosting applications use
//From what I know it should work for you, but if it doesn't you'll have to do some research
const port = process.env.PORT || 6969;


//Creating the http server
const server = http.createServer(express);

//Creating the socket server through the http server
const ws = new WebSocket.Server({ server })

//websocket functions
ws.on('connection', (ws) => {
  console.log("Client has connected");
  ws.on('close', () => console.log("Client has disconnected"));
  ws.on('message', function incoming(data) {
    ws.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})

server.listen(port, function(){
  console.log(`Server is listening on ${port}!`)
})