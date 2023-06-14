"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.peerHandler = void 0;
var peer_1 = require("peer");
var utils_1 = require("../utils");
var peerHandler = function (app, server) {
    var peer = (0, peer_1.ExpressPeerServer)(server, {
        debug: false,
        path: "/",
        generateClientId: utils_1.idClientGeneration
    });
    app.use("/mypeer", peer);
    peer.on("connection", function (e) {
        console.log("A user connected Peer server", e.getId());
    });
    return peer;
};
exports.peerHandler = peerHandler;
