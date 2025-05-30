
import mongoose, {  Schema, Types } from "mongoose";

const Message = new Schema(
  {
    content:String,
    attachment: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    sender: {
      type: Types.ObjectId,
       ref: "User",
      required: true,
    },
   
    chat: {
      type: Types.ObjectId,
      ref: "Chat",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const MessageModel = mongoose.model("Message", Message);
export default MessageModel;
