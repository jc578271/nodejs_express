import {Express} from "express";
import {ExpressPeerServer} from "peer";
import {idClientGeneration} from "../utils";
import {TServer} from "../index";

export const peerHandler = (app: Express, server: TServer) => {
  const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: "/",
    generateClientId: idClientGeneration
  })


  app.use("/mypeer", peerServer)
}
