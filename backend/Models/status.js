import e from "express";
import mongoose, { Schema, Types } from "mongoose";

const request = new Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },

    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const RequestModel=mongoose.model('Request',request)
export default RequestModel;