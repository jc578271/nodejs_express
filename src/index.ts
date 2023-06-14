import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv';
import http from 'http'
import axios from "axios";
import multer from "multer"
import https from "https"
// import {socketHandler} from "./handler/socket";
// import {peerHandler} from "./handler/peer";

dotenv.config();

const app: Express = express();
const server = http.createServer(app)
const form = multer()
export type TServer = typeof server

const agent = new https.Agent({
  rejectUnauthorized: false,
})

const port = process.env.PORT;
const ip_address = process.env.IP_ADDRESS;

app.use(express.urlencoded())
app.use(express.json())
app.use(form.array())

const getUrl = (req: Request) => req.url.split(req.route.path.substring(0, req.route.path.length-1))[1]

app.post('/login/*', async (req: Request, res: Response) => {
  const url = getUrl(req)

  const _res = await axios.post(`https://login.success.org/${url}`, req.body, {
    httpsAgent: agent,
    headers: {
      "Content-Type": req.headers["content-type"]
    }
  })
  res.json(_res.data)
});

app.post('/true/policy/*', async (req: Request, res: Response) => {
  const url = getUrl(req)

  const _res = await axios.post(`https://true.success.org/policy/${url}`, req.body, {
    httpsAgent: agent,
    headers: {
      "Content-Type": req.headers["content-type"]
    }
  })
  res.json(_res.data)
});

/* -- peer -- */
// export const peer = peerHandler(app, server)
//
// /* -- socket-io -- */
// socketHandler(server, peer)


/* -- server listener -- */
server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://${ip_address}:${port}`);
});
