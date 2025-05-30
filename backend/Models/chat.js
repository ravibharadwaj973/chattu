import mongoose, {  Schema, Types } from "mongoose";

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    creator: {
      type: Types.ObjectId,
     ref: "User",
    },
    groupchat: {
      type: Boolean,
      default: false,
    },
    members: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const ChatModel = mongoose.model("Chat", User);
export default ChatModel;
