import express from 'express';
import http from 'http';
import {Server }  from 'socket.io';
const cors = require('cors');
const app = express();

app.use(cors())
const server = http.createServer(app);
const io = new Server(server)

const PORT = process.env.PORT || 3009

app.get('/', (req, res) => {
    res.send('Hello is server');
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(PORT, () => {
    console.log('listening on *:3000');
});