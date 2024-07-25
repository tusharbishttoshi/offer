const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  verify: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
  },
  firebase_token:{
    type:String,
    default:""
  },
  id :Number,
  dob: {
    type:String,
    default:""
  },
  zodiac:{
    type:String,
    default:""
  },
  taro: Date,
  week: Date,
  month: Number,
  year: Number,
  avatar: {
    public_id: {
      type: String,
      default: "avatar/qrha3atky0s6dgdalcqs"
    },
    url: {
      type: String,
      default: "https://res.cloudinary.com/daufn0xzj/image/upload/v1673085445/avatar/qrha3atky0s6dgdalcqs.png"
    },
  },
  balance: {
    type: Number,
    default: 0,
    // default: 7.53,
  },
  bonus: {
    type: Number,
    default: 0,
  },
  bt: String,
  bp: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


userSchema.index({ name: "text", profession: "text" });
module.exports = mongoose.model("User", userSchema);
