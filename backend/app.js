const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const errorMiddleware = require("./middleware/error");

// const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', "http://193.203.162.221:3000", "http://193.203.162.221:3100", "http://193.203.162.221:3200",
// 'https://unzziptruth.com', "https://astro.unzziptruth.com",  "https://astro.admin.unzziptruth.com", ];

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3100',
  'http://localhost:3200',
  'http://193.203.162.221:3000',
  'http://193.203.162.221:3001',
  'http://192.168.29.6:3100',
  'http://192.168.29.6:3200',
  'https://unzziptruth.com',
  "https://astro.unzziptruth.com",
  "https://admin.unzziptruth.com",
  "https://astro.admin.unzziptruth.com",
];

app.use(cors({
  origin: allowedOrigins,
}));



app.use(express.json({ limit: '100mb' }))


const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const adminRoutes = require("./routes/adminRoutes")
const roleRoutes = require("./routes/roleRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const offerRoutes = require("./routes/offerRoutes.js")
const astro = require("./routes/astroRoutes");
const session = require("./routes/sessionRoutes");
const recharge = require("./routes/rechargeRoutes.js");
const offChat = require("./routes/offChatRoutes.js");
const Cancel = require("./routes/Cancel.js");
const invoice = require("./routes/astroBankRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const reasonRoues = require("./routes/reasonRoues.js");

const message = require("./routes/messageRouter.js");

app.use("/api/v1", recharge)
app.use("/api/v1", invoice)
app.use("/api/v1", Cancel)
app.use("/api/v1", offChat)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1", chatRoutes)
app.use("/api/v1", adminRoutes)
app.use("/api/v1", roleRoutes)
app.use("/api/v1", categoryRoutes)
app.use("/api/v1", offerRoutes)
app.use("/api/v1", astro)
app.use("/api/v1", session)
app.use("/api/v1", blogRoutes)
app.use("/api/v1", message)
app.use("/api/v1/reason", reasonRoues)

app.get('/privacy-policy', function (req, res) {
  res.sendFile(path.join(__dirname + '/Policy.html'));
});

app.get('/terms-conditions', function (req, res) {
  res.sendFile(path.join(__dirname + '/term_and_condition.html'));
});

app.get('/about-us', function (req, res) {
  res.sendFile(path.join(__dirname + '/AboutUs.html'));
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./build")));


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});



app.use(errorMiddleware);

module.exports = app;
