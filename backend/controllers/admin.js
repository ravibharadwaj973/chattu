import ChatModel from "../Models/chat.js";
import MessageModel from "../Models/message.js";
import UserModel from "../Models/user.js";
import jwt from "jsonwebtoken";

const adminlogin = (req, res) => {
  const { secretKey } = req.body;
  try {
    if (secretKey !== process.env.PASSWORD) {
      return res.status(400).json({
        status: "error",
        message: "Invalid secret key",
      });
    }
    const token=jwt.sign(secretKey, process.env.VERIFY_CODE)
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({
      status: "success",
      message: "Login successful",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
const adminlogout = (req, res) => {
  try {
    res.status(200).cookie("adminToken", "", {
      maxAge: 0, // Fixed typo: was 'maxAage'
      httpOnly: true, // Optional: for better security
      secure: true, // Optional: only over HTTPS
      sameSite: "strict", // Optional: CSRF protection
    });
    return res.status(200).json({
      status: "success",
      message: "logout successful",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
const getAdminData=async(req,res)=>{
  try {
    
   return res.status(200).json({
      status: "success",
      message: "Admin successfull",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}

const allusers = async (req, res) => {
  try {
    const users = await UserModel.find({});

    const transformedUsers = await Promise.all(
      users.map(async ({ _id, name, username, avatar }) => {
        const [groups, friends] = await Promise.all([
          ChatModel.countDocuments({ groupchat: true, members: _id }),
          ChatModel.countDocuments({ groupchat: false, members: _id }),
        ]);

        return {
          _id,
          name,
          username,
          avatar: avatar?.url || null,
          groups,
          friends,
        };
      })
    );

    return res.status(200).json({
      status: "success",
      data: transformedUsers,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const allChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({})
      .populate("members", "name avatar")
      .populate("creator", "name avatar");

    const transformedChats = await Promise.all(
      chat.map(async ({ _id, name, creator, groupchat, members }) => {
        const totalMessages = await MessageModel.countDocuments({ chat: _id });

        return {
          _id,
          name,
          creator: {
            _id: creator._id,
            name: creator.name,
            avatar: creator.avatar?.url || null,
          },
          groupchat,
          avatar: members.slice(0, 3).map((mem) => mem.avatar?.url),
          members: members.map(({ _id, name, avatar }) => ({
            _id,
            name,
            avatar: avatar?.url || null,
          })),
          totalMembers: members.length,
          totalMessages,
        };
      })
    );

    return res.status(200).json({
      status: "success",
      chat: transformedChats, // ✅ Fixed
    });
  } catch (err) {
    return res.status(502).json({
      status: "error",
      message: err.message,
    });
  }
};

const allMessages = async (req, res) => {
  try {
    const message = await MessageModel.find({})
      .populate("sender", "name avatar")
      .populate("chat", "groupchat");

    const transformedMessages = message.map(
      ({ _id, sender, chat, attachment, content, createdAt }) => ({
        _id,
        attachment,
        content,
        createdAt,
        chat: chat._id,
        groupchat: chat.groupchat,
        sender: {
          _id: sender._id,
          name: sender.name,
          avatar: sender.avatar?.url || null,
        },
      })
    );

    return res.status(200).json({
      status: "success",
      messages: transformedMessages, // ✅ Renamed for clarity
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getDashBoard = async (req, res) => {
  try {
    const [groupcount, messagecount, userscount, totalcount] =
      await Promise.all([
        ChatModel.countDocuments({ groupchat: true }),
        MessageModel.countDocuments({}),
        ChatModel.countDocuments({}),
        UserModel.countDocuments({}),
      ]);

    const today = new Date();
    const last7Day = new Date();
    last7Day.setDate(today.getDate() - 7);

    const dayInMilliseconds = 1000 * 60 * 60 * 24;

    const last7dayMessages = await MessageModel.find({
      createdAt: {
        $gte: last7Day,
        $lte: today,
      },
    }).select("createdAt");

    const messageChart = new Array(7).fill(0);

    last7dayMessages.forEach((msg) => {
      const diffInDays = Math.floor(
        (today - msg.createdAt) / dayInMilliseconds
      );
      const index = 6 - diffInDays;
      if (index >= 0 && index < 7) {
        messageChart[index]++;
      }
    });

    const states = {
      groupcount,
      messagecount,
      userscount,
      totalcount,
      messageChart,
    };

    return res.status(200).json({
      status: "success",
      states,
    });
  } catch (err) {
    return res.status(502).json({
      status: "error",
      message: err.message,
    });
  }
};

export { allusers, allChats, allMessages, getDashBoard, adminlogin,adminlogout ,getAdminData};
