import mongoose, { Schema } from "mongoose";

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model("User", User);
export default UserModel;
