"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.peerHandler = void 0;
var peer_1 = require("peer");
var utils_1 = require("../utils");
var peerHandler = function (app, server) {
    var peerServer = (0, peer_1.ExpressPeerServer)(server, {
        debug: true,
        path: "/",
        generateClientId: utils_1.idClientGeneration
    });
    app.use("/mypeer", peerServer);
};
exports.peerHandler = peerHandler;
