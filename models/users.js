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
  preferences: {
    type: [String],
    default: [],
    required: false
  }
}, { timestamps: true });


const User = mongoose.model("User", userSchema);

export default User;

