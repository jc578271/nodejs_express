import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv';
import http from 'http'
import {socketHandler} from "./handler/socket";
import {peerHandler} from "./handler/peer";

dotenv.config();

const app: Express = express();
const server = http.createServer(app)
export type TServer = typeof server

const port = process.env.PORT;
const ip_address = process.env.IP_ADDRESS;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

/* -- peer -- */
export const peer = peerHandler(app, server)

/* -- socket-io -- */
socketHandler(server, peer)


/* -- server listener -- */
server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://${ip_address}:${port}`);
});
