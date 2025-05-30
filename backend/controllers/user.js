import UserModel from "../Models/user.js";
import bcrypt from "bcrypt";
import { emitEvent, sendToken } from "../utils/feature.js";
import ChatModel from "../Models/chat.js";
import RequestModel from "../Models/status.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/event.js";

const newUser = async (req, res, next) => {
  try {
    const { name, password, username, bio } = req.body;

    const files=req.files;
    console.log(files)
  if (!files || Object.keys(files).length === 0) {
  return res.status(400).json({ message: "Please upload avatar" });
}


    if (!name || !username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      username,
      password: hashedPassword,
      bio: bio || "",
      avatar: {
        public_id: "default_id",
        url: "default_url", // Replace with real image URL logic later
      },
    });

    sendToken(res, user, 201, "User created successfully");
    next();
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid details",
      });
    }

    const user = await UserModel.findOne({ username }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not registered. Please sign up.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password. Try again.",
      });
    }

    sendToken(res, user, 200, `Welcome back, ${user.name}`);
    next();
  } catch (error) {
    console.log(error);
  }
};

const getmyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    message: " chal na bhai",
    data: req.user,
  });
  console.log(data);
};
const Search = async (req, res) => {
  try {
    const { name } = req.query;

    const mychat = await ChatModel.find({
      groupchat: false,
      members: req.user,
    });

    const allUsersFromMyChats = mychat.map((chat) => chat.members).flat();

    const allUsersExecptMeandmyfriends = await UserModel.find({
      _id: { $nin: allUsersFromMyChats },
      name: { $regex: name, $options: "i" },
    });
    const users = allUsersExecptMeandmyfriends.map(({ _id, avatar, name }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));

    res.status(200).json({
      success: true,
      message: "chal na bhai",
      data: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const sendFriendrequest = async (req, res) => {
  try {
    const { userId } = req.body;

    const existingRequest = await RequestModel.findOne({
      $or: [
        { sender: req.user, receiver: userId },
        { sender: userId, receiver: req.user },
      ],
    });

    if (existingRequest) {
      return res.status(409).json({
        success: false,
        message: "Friend request has already been sent.",
      });
    }

    // Create a new request
    await RequestModel.create({
      sender: req.user,
      receiver: userId,
    });

    emitEvent(req, NEW_REQUEST, [userId], "request");

    return res.status(200).json({
      success: true,
      message: "Friend request has been sent.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
const acceptFriendrequest = async (req, res) => {
  try {
    const { requestId, accept } = req.body;

    const request = await RequestModel.findById(requestId)
      .populate("receiver", "name")
      .populate("sender", "name");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Friend request not found.",
      });
    }

    const me = req.user.toString();
    const receiverId = request.receiver._id.toString();

    if (receiverId !== me) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to accept this request.",
      });
    }

    if (!accept) {
      await request.deleteOne();
      return res.status(200).json({
        success: true,
        message: "Friend request has been rejected.",
      });
    }

    const members = [request.sender._id, request.receiver._id];

    await ChatModel.create({
      members,
      name: `${request.sender.name}-${request.receiver.name}`,
    });

    await request.deleteOne();

    emitEvent(req, REFETCH_CHATS, members);

    return res.status(200).json({
      success: true,
      message: "Friend request accepted.",
      senderId: request.sender._id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const getAllNotifications = async (req, res, next) => {
  try {
    const requests = await RequestModel.find({ receiver: req.user }).populate(
      "sender",
      "avatar name"
    );

    const formattedRequests = requests.map(({ _id, sender }) => ({
      _id,
      sender: {
        _id: sender._id,
        name: sender.name,
        avatar: sender.avatar?.url || null,
      },
    }));
    next();

    return res.status(200).json({
      success: true,
      message: "Friend requests fetched successfully.",
      request: formattedRequests,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
const getFriends = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user; 
    const chats = await ChatModel.find({
      members: userId,
      groupchat: false
    }).populate("members", "name avatar");

    const friends = chats.map(chat => {
      return chat.members.find(member => member._id.toString() !== userId.toString());
    });

    return res.status(200).json({
      success: true,
      message: "Friends fetched successfully.",
      friends, 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const Logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: " chal na bhai",
    data: req.user,
  });
};
export {
  login,
  newUser,
  getmyProfile,
  Search,
  Logout,
  sendFriendrequest,
  acceptFriendrequest,
  getAllNotifications,
  getFriends,
};
