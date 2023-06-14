import {Server} from "socket.io";
import {TServer} from "../index";
import {sendMessage} from "../firebase";

export const socketHandler = (server: TServer, peer) => {
  const io = new Server(server)

  io.on('connection', (socket) => {
    console.log('a user connected, id: ', socket.id)

    socket.on('chat-message', (msg) => {
      io.emit('chat-message', msg)
    })

    socket.on('typing', (msg) => {
      io.emit('typing', msg)
    })

    socket.on('send_message', (msg) => {
      sendMessage(msg).then()
      // sendPushKit(msg).then()
      io.emit('send_message', msg)
    })

    socket.on('disconnect_peer', (msg) => {
      console.log(msg.user, peer)
      peer.disable()
    })
  })
}
