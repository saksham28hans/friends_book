const express = require('express');
const app = express();
const dotenv = require('dotenv');
const http = require('http');
const server = http.createServer(app);
// const { Server } = require('socket.io');

const PORT = process.env.PORT || 8900;
const cors = require('cors');

dotenv.config();
// const io = require("socket.io")(8900,{
//     cors : {
//         origin : "http://localhost:3000",
//     },  
// });

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});

let users= [];

const addUser = (userId,socketId)=>{
    !users.some((user)=> user.userId === userId) &&
    users.push({userId,socketId});
}

const removeUser = (socketId)=>{
    users = users.filter((user)=>user.socketId !== socketId);
};

const getUser = (userId)=>{
    return users.find(user=>user.userId === userId);
};

io.on("connection",(socket)=>{
    console.log("A user connected.");
    socket.on("adduser",userId=>{
      addUser(userId,socket.id);
      io.emit("getUsers",users);
    })

//send and get messages
    socket.on("sendMessage", ({senderId,receiverId,text})=>{
        const user = getUser(receiverId);
        if(user)
        {
        io.to(user.socketId).emit("getMessage",{
            senderId,
            text,
        });
        }
    });

    socket.on("disconnect",()=>{
        console.log("A user disconnected");
        removeUser(socket.id)
        io.emit("getUsers",users);
    })
})

server.listen(PORT,()=>{
    console.log(`Listening on port${PORT}`);
});