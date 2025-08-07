const express = require("express");
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Connected: ", socket.id);

    socket.on("join", (roomId) => {
        console.log(`Socket ${socket.id} joined ${roomId}`);
        socket.join(roomId);
    });

    socket.on("Chat message", (msg) => {
        console.log("Broadcasting: ", msg);
        io.to(msg.room).emit("Chat message", msg);
    });

    socket.on("typing", ({room, user}) => {
        console.log(`Typing event received on server from ${user} in room ${room}`);
        socket.to(room).emit('typing', {room, user});
    });

    socket.on("disconnect", () => {
        console.log("Disconnected: ", socket.id);
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Websocket server on http://localhost:${PORT}`);
});