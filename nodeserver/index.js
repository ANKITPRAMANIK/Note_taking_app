const express = require('express');
const { createServer } = require('http');
const path = require('path');
const { Server } = require('socket.io');
const app = express();
const server = createServer(app);
const io = new Server(server)


const users={}

app.get('/', (req, res) => {
  
  res.sendFile(path.join(__dirname, './ankit/index.html'));
});
io.on("connection", (socket) => {
  socket.on("new-user-join",(name) => {
    users[socket.id]=name
    console.log(socket.id)
   socket.broadcast.emit("user-joined", name)
  });
   socket.on('send',(message)=>{
    socket.broadcast.emit('recieve',{name:users[socket.id],message:message})
   })
   socket.on('disconnect', message=>{
    socket.broadcast.emit('leave', users[socket.id]);
    delete users[socket.id];
});







});

server.listen(8000, () => {
  console.log('server running at http://localhost:8000');
});