import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

const app = express();

const messages:Array<any> = [

]
const users = new Map()
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

const PORT = process.env.PORT || 3009

app.get('/', (req, res) => {
    res.send('Hello is server');
});

io.on('connection', (socket) => {
    users.set(socket, {id: new Date().getTime().toString(), name: 'Anonym'})
    socket.on('client-name-sent', (name) => {
        if (typeof name !== 'string') return
        const user = users.get(socket)
        user.name = name

    })
    socket.on('disconnect', () => {
        users.delete(socket)
    });
    socket.on('client-message-sent', mes => {
        if (typeof mes !== 'string') return
        const user = users.get(socket)
        let mesItem = {
            message: mes, id: new Date().getTime().toString(),
            user: {id: user.id, name: user.name}
        }
        messages.push(mesItem)
        socket.emit('new-message-sent', mesItem)
    })
    socket.emit('messages-init', messages)

    console.log('a user connected');
});


server.listen(PORT, () => {
    console.log('listening on *:3009');
});