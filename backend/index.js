const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv")

const {updateAccounts} = require("./controllers/adminController")
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});


dotenv.config({ path: "./config/config.env" })
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: 258883337715583,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3100',
  'http://localhost:3200',
  'http://193.203.162.221:3000',
  'http://193.203.162.221:3001',
  'http://193.203.162.221:3100',
  'http://193.203.162.221:3200',
  'https://unzziptruth.com',
  "https://astro.unzziptruth.com",
  "https://admin.unzziptruth.com",
  "https://astro.admin.unzziptruth.com",

];


// const io = require("socket.io")(server)

const io = require("socket.io")(server, {
  pingTimeout: 60000, cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
})



const Log = require("./models/loginActivity");
const { allMessages } = require("./controllers/chatController");
const User = require("./models/userModel")
const Astro = require("./models/astroModel");
// const { find } = require("./models/adminModel");

// let socket = io({
//   auth: {
//     id: "34346456757867854" // Pass the user ID as part of the authentication
//   }
// });
io.on("connection", async (socket) => {
  console.log("connection", socket.handshake.auth);
  // if (socket.handshake.auth.user === "astro") {
  //   await Astro.findByIdAndUpdate({ _id: socket.handshake.auth.id }, { isOnline: "Online" }, { new: true });
  //   socket.broadcast.emit("offline", { id: socket.handshake.auth.id })
  // }
  socket.on("setup", (userData) => {//

    // console.log("setup", userData)
    socket.join(userData)
  })
  socket.on("join chat", (room) => {

    // console.log("JOINROMM", { room })
    socket.join(room)
  })
  socket.on("sendRequest", ({ astrologerId, user }) => {

    socket.in(astrologerId).emit("receiveRequest", { user })
    
    // console.log("sendRequest", astrologerId, user)

  })
  socket.on("stopTime", ({ id }) => {   //
    // console.log("stopTime", { id })
    socket.in(id).emit("scopedTime")
  })

  socket.on("startTime", ({ id }) => {
    // console.log("startTime", id);
    socket.broadcast.emit("liveAstro", { id })
  })


  socket.on("endTime", ({ id }) => {
    // console.log("endTime", id);
    socket.broadcast.emit("endWork", { id })

  })

  socket.on("charRedirect", ({ path, astro, userId }) => {

    // console.log("charRedirect", path, astro, userId)
    socket.in(userId).emit("ChatPage", { path, astro })
  })

  socket.on("cancelRequest", ({ astrologer, user }) => {//

    // console.log("cancelRequest", astrologer, user)
    socket.in(astrologer).emit("withdrawRequest", user)
  })
  socket.on("stopChat", ({ id }) => { //other person id 
    socket.in(id).emit("stoppedChat")
  })

  socket.on("rejectRequest", ({ clientId, astro }) => {  // astro reject chat 

    // console.log("rejectRequest", clientId, astro)
    socket.in(clientId).emit("astroReject", { astro })
  })

  socket.on("new message", (newMassageReceived) => {
    var chat = newMassageReceived.chat
    if (chat?.user?._id == newMassageReceived.sender) {
      socket.in(chat.astro?._id).emit("message received", newMassageReceived)
    }
    else {
      socket.in(chat.user?._id).emit("message received", newMassageReceived)
    }
  })
  // 
  //
  socket.on("acceptRequest", ({ clientId, astro }) => {
    // console.log("acceptRequest", clientId, astro)

    socket.in(clientId).emit("AstrologerCall", astro)
  })

  socket.on("endChat", ({ id }) => {
    // console.log(id)
  })
  socket.on("test", () => {
    // console.log("hii")
  })
  socket.on("disconnect", async () => {
    if (socket.handshake.auth.user === "astro") {
      let a = await Astro.findByIdAndUpdate({ _id: socket.handshake.auth.id }, { isOnline: "Offline" }, { new: true });
      if (a) {
        console.log("offline",socket.handshake.auth.id);
        const b = new Date()
        let find = await Log.find({ type: "WorkTime" }).sort({ createdAt: -1 }).limit(1)
        if(find){
          const a = await Log.findOneAndUpdate({ astro: socket.handshake.auth.id, _id: find[0]?._id }, { endAt: b }, { new: true })
          socket.broadcast.emit("offline", { id: a._id })
        }
      }
    }
  });
});
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});


// io.on('connection', function(socket) {

//   // This happen whenever user is online.
//   User.findById({ _id: socket.request.user._id}, function(err, foundUser) {

//    if (err) console.log(err);

//    foundUser.socketId = socket.id;
//    foundUser.online = true;
//    foundUser.save(function(err) {
//      if (err) console.log(err);
//      socket.broadcast.emit('connection', 'Online');
//    });
//  });

//  socket.on('disconnect', function() {
//    User.findById({ _id: socket.request.user._id}, function(err, foundUser) {

//      if (err) console.log(err);

//      foundUser.online = false;
//      foundUser.save(function(err) {
//        if (err) console.log(err);
//        socket.broadcast.emit('connection', 'Offline');
//      });
//    });
//  });
// }); 