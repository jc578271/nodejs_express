import {Express} from "express";
import {ExpressPeerServer} from "peer";
import {idClientGeneration} from "../utils";
import {TServer} from "../index";

export const peerHandler = (app: Express, server: TServer) => {
  const peer = ExpressPeerServer(server, {
    debug: false,
    path: "/",
    generateClientId: idClientGeneration
  })

  app.use("/mypeer", peer)

  peer.on("connection", (e) => {
    console.log("A user connected Peer server", e.getId())
  })

  return peer
}
