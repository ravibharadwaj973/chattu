import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userSocketId } from "../app.js";

const isDev = process.env.NODE_ENV !== "production";

const cookiesOption = {
  maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  sameSite: isDev ? "lax" : "none",
  httpOnly: true,
  secure: !isDev, // Only secure in production
};

const connectDB = async (uri) => {
  try {
    const data = await mongoose.connect(uri, { dbName: "chatu" });
    console.log(`MongoDB connected ${data.connection.host}`);
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ id: user._id }, process.env.VERIFY_CODE);
  return res.status(code).cookie("token", token, cookiesOption).json({
    success: true,
    message,
    token,
  });
};
const emitEvent=(user,event,users,data)=>{
  console.log("emitEvent",event)
}

const deleteFileFromCloudnary=async(req,res)=>{

}

export const getSockets=(user=[])=>{
  const socket=user.map((u)=>userSocketId.set(user._id.toString()))
  return socket;
}

export { sendToken,emitEvent,deleteFileFromCloudnary };
export default connectDB;
