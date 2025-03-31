import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  favorites: {
    type: [String],
    required: false,
    default: []
  },
  read: {
    type: [String],
    required: false,
    default: []
  },
  saved: {
    type: [String],
    required: false,
    default: []
  },
  preferences: {
    type: [String],
    maxlength: 3,
    default: [],
    required: false
  }
}, { timestamps: true });


const User = mongoose.model("User", userSchema);

export default User;

