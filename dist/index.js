"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.peer = void 0;
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var http_1 = __importDefault(require("http"));
var socket_1 = require("./handler/socket");
var peer_1 = require("./handler/peer");
dotenv_1.default.config();
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var port = process.env.PORT;
var ip_address = process.env.IP_ADDRESS;
app.get('/', function (req, res) {
    res.send('Express + TypeScript Server');
});
/* -- peer -- */
exports.peer = (0, peer_1.peerHandler)(app, server);
/* -- socket-io -- */
(0, socket_1.socketHandler)(server, exports.peer);
/* -- server listener -- */
server.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://".concat(ip_address, ":").concat(port));
});
