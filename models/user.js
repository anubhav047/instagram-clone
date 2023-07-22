const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [
    {
      type: ObjectId,
      ref: "USER",
      default:{}
    }
  ],
  following: [
    {
      type: ObjectId,
      ref: "USER",
      default:{}
    }
  ],
  image:{
    type:String,
    default:"https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
  }
});

module.exports = mongoose.model("USER", userSchema);
