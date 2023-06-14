"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = void 0;
var socket_io_1 = require("socket.io");
var firebase_1 = require("../firebase");
var socketHandler = function (server, peer) {
    var io = new socket_io_1.Server(server);
    io.on('connection', function (socket) {
        console.log('a user connected, id: ', socket.id);
        socket.on('chat-message', function (msg) {
            io.emit('chat-message', msg);
        });
        socket.on('typing', function (msg) {
            io.emit('typing', msg);
        });
        socket.on('send_message', function (msg) {
            (0, firebase_1.sendMessage)(msg).then();
            // sendPushKit(msg).then()
            io.emit('send_message', msg);
        });
        socket.on('disconnect_peer', function (msg) {
            console.log(msg.user, peer);
            peer.disable();
        });
    });
};
exports.socketHandler = socketHandler;
