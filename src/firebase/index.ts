import admin from "firebase-admin"
const serviceAcc = require("../../basicproject-c7905-firebase-adminsdk-cvozh-bc5b09f451.json")

/* Init firebase */
admin.initializeApp({
  credential: admin.credential.cert(serviceAcc),
  databaseURL: 'https://basicproject-c7905-default-rtdb.asia-southeast1.firebasedatabase.app',
});

const db = admin.database()
const ref = db.ref('fcmtokens')
// const pushkitRef = db.ref('pushkittokens')

export const sendMessage = async (msg) => {
  ref.on("value", async snap => {
    const object = snap.val()

    const tokens = Object.keys(object).map(key => object[key])

    console.log("token", msg)

    // Send a message to devices with the registered tokens
    await admin.messaging().sendMulticast({
      tokens, // ['token_1', 'token_2', ...]
      notification: {
        title: 'A notification title!:' + msg.params,
        body: 'A notification body: ' + msg.params,
      },
      apns: {
        payload: {
          aps: {
            category: msg.params,
            sound: 'media/kick.wav',
            threadId: msg.params,
          },
        },
      }
    })
  })
}


// import {v4} from 'uuid';
//
// export const sendPushKit = async (msg) => {
//   ref.on("value", async snap => {
//     const object = snap.val()
//
//     const tokens = Object.keys(object).map(key => object[key])
//     const uuid = v4()
//     console.log(uuid)
//
//     // Send a message to devices with the registered tokens
//     await admin.messaging().sendMulticast({
//         tokens,
//       notification: {
//           title: 'ok',
//         body: 'ok'
//       },
//         data: {
//           uuid: uuid,
//           handle: "23213123",
//           callerName: "okok"
//         },
//         apns: {
//           headers: {
//             "apns-push-type": "voip",
//             "apns-topic": "success.tech.message.voip"
//           },
//           payload: {
//             aps: {
//               // contentAvailable: true
//             },
//
//           }
//         }
//     }
//
//       // {
//       //     data: {
//       //       uuid,
//       //       handle: "23213123",
//       //       callerName: "okok"
//       //     },
//       // }
//   )})
// }

