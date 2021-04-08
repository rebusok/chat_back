"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var app = express_1.default();
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server);
app.get('/', function (req, res) {
    res.send('Hello is server');
});
io.on('connection', function (socket) {
    console.log('a user connected');
});
server.listen(3009, function () {
    console.log('listening on *:3000');
});
