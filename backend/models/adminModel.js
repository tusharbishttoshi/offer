const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  name: String,
  number: Number,
  password: {
    type: String,
    select: false,
  },
  // role: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Role"
  // },

  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
  user_type: { type: String, enum: ['Admin', 'SubAdmin'], default: 'SubAdmin' },
  role: { type: Array, default: null }, //enum:[ "BlogManagement" ,"AstrologerManagement" ,"UserManagement" , "TransactionManagement" , "ChatManagement" ,"RefundManagement" , "SessionManagement" , "ReasonManagement" ]
  balance: {
    type: Number,
    default:0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("Admin", adminSchema);
