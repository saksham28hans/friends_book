const express = require('express');
const app = express();
const dotenv = require('dotenv');
const PORT = process.env.PORT || 8900;
const http = require('http');



const cors = require('cors');

dotenv.config();
app.use(cors());

const server = http.createServer(app)
const { Server } = require('socket.io');
const io = new Server(server,{
    cors : {
        origin : "*",
    },  
    transports : ['websocket','polling','flashsocket'],
    methods: ["GET", "POST"]
});

// const io = require('socket.io')(server, {
//     cors: {
//         origin: true,
//         credentials: true,
//       },
//       allowEIO3: true,
// });

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

server.prependListener("request", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
 });

server.listen(PORT,()=>{
    console.log(`Listening on port${PORT}`);
});