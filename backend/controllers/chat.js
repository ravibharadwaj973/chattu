import {
  ALERT,
  NEW_ATTECTMENTS,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/event.js";
import ChatModel from "../Models/chat.js";
import MessageModel from "../Models/message.js";
import UserModel from "../Models/user.js";
import { deleteFileFromCloudnary, emitEvent } from "../utils/feature.js";
const newGroup = async (req, res) => {
  const { name, members } = req.body;

  try {
    const num = members.length > 2;
    if (!num) {
      return res.json({
        success: false,
        message: "For Group Chat you need at least 3 members",
      });
    }

    const allmembers = [...members, req.user];

    await ChatModel.create({
      name,
      groupchat: true,
      creator: req.user,
      members: allmembers,
    });

    emitEvent(req, ALERT, allmembers, `Welcome to ${name} group`);
    emitEvent(req, REFETCH_CHATS, members);

    return res.status(200).json({
      success: true,
      message: `${name} group created`,
      data: allmembers,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
const getmyChat = async (req, res, next) => {
  try {
    const chats = await ChatModel.find({ members: req.user }).populate(
      "members",
      "name username avatar"
    );

    const transformedChats = chats.map((chat) => {
      const { _id, name, groupchat, members, lastMessage } = chat;

      const otherMember = members.find(
        (member) => member._id.toString() !== req.user._id
      );

      return {
        _id,
        name: groupchat ? name : otherMember?.name,
        groupchat,
        members: members
          .filter((member) => member._id.toString() !== req.user._id)
          .map((m) => m._id),
        lastMessage,
        avatar: groupchat
          ? members.slice(0, 3).map((member) => member.avatar?.url)
          : otherMember?.avatar?.url,
      };
    });

    return res.status(200).json({
      success: true,
      chats: transformedChats,
    });
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const getmyGroup = async (req, res) => {
  try {
    const chats = await ChatModel.find({
      members: req.user,
      creator: req.user,
      groupchat: true,
    }).populate("members", "name avatar");

    const group = chats.map(({ members, _id, groupchat, name }) => {
      return {
        _id,
        name,
        groupchat,
        members,
        avatar: members.slice(0, 3).map((member) => member.avatar?.url),
      };
    });

    return res.status(200).json({
      success: true,
      group: group,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const addMember = async (req, res, next) => {
  const { chatId, members } = req.body;
  if (!members || members.length < 1) {
    res.json({ success: false, message: "please provide members" });
  }
  try {
    const chats = await ChatModel.findById(chatId);
    if (!chats) {
      res.json({
        success: false,
        message: "Chat not found",
      });
    }
    if (!chats.groupchat) {
      res.json({
        success: false,
        message: "This is not a group chat",
      });
    }
    if (chats.creator.toString() !== req.user) {
      res.json({
        success: false,
        message: "You are not Allowed to add members",
      });
    }
    const allNewMemberPromise = members.map((i) =>
      UserModel.findById(i, "name")
    );
    const allNewMember = await Promise.all(allNewMemberPromise);
    const uniqueMembers = allNewMember.filter(
      (i) => !chats.members.includes(i._id)
    );

    chats.members.push(...uniqueMembers.map((i) => i._id));

    if (chats.length > 100) {
      res.status(400).json({
        success: false,
        message: "Group member limit reached",
      });
    }
    await chats.save();
    const allUserName = allNewMember.map((i) => i.name).join(",");
    emitEvent(
      req,
      ALERT,
      chats.members,
      `${allUserName} has been added in the group!`
    );

    return res.status(200).json({
      success: true,
      message: "Member Added Succesfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
const removeMember = async (req, res, next) => {
  const { chatId, userId } = req.body;

  try {
    const [chat, userThatwillBeRemove] = await Promise.all([
      ChatModel.findById(chatId),
      UserModel.findById(userId, "name"),
    ]);

    if (!chat) {
      res.json({
        success: false,
        message: "Chat not found",
      });
    }
    if (!chat.groupchat) {
      res.json({
        success: false,
        message: "this is not group chat",
      });
    }
    if (chat.creator.toString() !== req.user) {
      res.json({
        success: false,
        message: "Only Creator can remove members",
      });
    }
    if (chat.members <= 3) {
      res.json({
        success: false,
        message: "Group need to have atleast 3 members",
      });
    }
    chat.members.filter((mem) => mem.toString() !== userId.toString());
    await chat.save();
    emitEvent(req, ALERT, chat.members);
    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
      success: true,
      message: "Member removed Succesfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
const leaveGroup = async (req, res, next) => {
  const chatId = req.params.id;

  try {
    const chat = await ChatModel.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    if (!chat.groupchat) {
      return res.status(400).json({
        success: false,
        message: "This is not a group chat",
      });
    }

    const userId = req.user.toString();

    const remainingMembers = chat.members.filter(
      (member) => member.toString() !== userId
    );

    if (!chat.members.some((member) => member.toString() === userId)) {
      return res.status(400).json({
        success: false,
        message: "User is not a member of this group",
      });
    }

    // Handle creator logic
    if (chat.creator.toString() === userId) {
      if (remainingMembers.length === 0) {
        // Optionally, delete the group or prevent leaving
        return res.status(400).json({
          success: false,
          message: "Creator cannot leave the group as the last member",
        });
      }
      // Reassign a new creator randomly
      const randomIndex = Math.floor(Math.random() * remainingMembers.length);
      chat.creator = remainingMembers[randomIndex];
    }

    // Update members and save
    chat.members = remainingMembers;
    await chat.save();

    const user = await UserModel.findById(userId, "name");

    emitEvent(req, ALERT, chat.members, `${user.name} has left the group`);
    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
      success: true,
      message: "You have left the group successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const sendAttachments = async (req, res, next) => {
  const { chatId } = req.body;

  try {
    const [chat, me] = await Promise.all([
      ChatModel.findById(chatId),
      UserModel.findById(req.user, "name"),
    ]);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    const files = req.files || [];

    if (files.length < 1) {
      return res.status(400).json({
        success: false,
        message: "Please provide attachments",
      });
    }
    if (files.length > 5) {
      return res.status(400).json({
        success: false,
        message: "files can't be more than 5",
      });
    }

    const attachments = [];

    const messageForDB = {
      content: "",
      attachments,
      sender: me._id,
      chat: chatId,
    };
    const messageForRealTime = {
      ...messageForDB,
      sender: {
        _id: me._id,
        name: me.name,
      },
    };

    const message = await MessageModel.create(messageForDB);

    emitEvent(req, NEW_ATTECTMENTS, chat.members, {
      message: messageForRealTime,
      chatId,
    });

    emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

    return res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const chatdetails = async (req, res, next) => {
  try {
    const shouldPopulate = req.query.populate === "true";

    const chatQuery = ChatModel.findById(req.params.id);
    if (shouldPopulate) {
      chatQuery.populate("members", "name avatar");
    }

    const chat = await chatQuery;

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    if (shouldPopulate) {
      chat.members = chat.members.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar: avatar?.url || null,
      }));
    }

    return res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const renameGroup = async (req, res, next) => {
  try {
    const chatId = req.params.id;
    const { name } = req.body;
    const chat = await ChatModel.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    if (chat.creator.toString() !== req.user) {
      return res.status(404).json({
        success: false,
        message: "You are not allow to change Group name ",
      });
    }
    chat.name = name;

    return res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const deleteChat = async (req, res, next) => {
  try {
    const chatId = req.params.id;
    console.log(chatId);
    const chat = await ChatModel.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    const members = chat.members;
    if (chat.groupchat && chat.creator.toString() !== req.user) {
      return res.status(404).json({
        success: false,
        message: "You are not allow to delete Group",
      });
    }
    if (!chat.groupchat && !chat.members.includes(req.user)) {
      return res.status(404).json({
        success: false,
        message: "You are not allow to delete chat",
      });
    }
    //we have to delete all the message as well as attechments and all files from cloudnary
    const messageWithAttectments = await MessageModel.find({
      chat: chatId,
      attachment: { $exists: true, $ne: [] },
    });
    //$exist means ye exist kr ta ha

    const public_ids = [];
    messageWithAttectments.forEach(({ attachment }) => {
      attachment.forEach((public_id) => {
        public_ids.push(public_id);
      });
    });
    await Promise.all([
      //delete from cloudnary
      deleteFileFromCloudnary(public_ids),
      chat.deleteOne(),
      MessageModel.deleteMany({ chat: chatId }),
    ]);

    emitEvent(req, REFETCH_CHATS, members);
    return res.status(200).json({
      success: true,
      message: "Chat has been deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const getMessage = async (req, res, next) => {
  try {
    const chatId = req.params.id;
    const { page = 1 } = req.query;

    const resultPerPage = 20;
    const skip = (page - 1) * resultPerPage;

    const [messages, totalMessages] = await Promise.all([
      MessageModel.find({ chat: chatId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(resultPerPage)
        .populate("sender")
        .lean(),
      MessageModel.countDocuments({ chat: chatId }),
    ]);

    const totalPage = Math.ceil(totalMessages / resultPerPage) || 1;

    return res.status(200).json({
      success: true,
      message: messages.reverse(),
      totalPage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server heloo Error",
      error: error.message,
    });
  }
};

export {
  newGroup,
  getmyChat,
  getmyGroup,
  addMember,
  removeMember,
  leaveGroup,
  sendAttachments,
  chatdetails,
  renameGroup,
  deleteChat,
  getMessage,
};
