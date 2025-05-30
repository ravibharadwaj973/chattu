import { faker, simpleFaker } from "@faker-js/faker";
import MessageModel from "../Models/message.js";
import ChatModel from "../Models/chat.js";
import UserModel from "../Models/user.js";

const createSingleChats = async () => {
  try {
    const users = await UserModel.find().select("_id");
    const chatPromises = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        chatPromises.push(
          ChatModel.create({
            name: faker.lorem.words(2),
            members: [users[i]._id, users[j]._id],
          })
        );
      }
    }

    await Promise.all(chatPromises);
    console.log(`${chatPromises.length} chats created.`);
    process.exit();
  } catch (error) {
    console.error("Error creating chats:", error);
    process.exit(1);
  }
};

const createGroupChats = async (numChats,creator) => {
  try {
    const users = await UserModel.find().select("_id");
    const chatPromises = [];

    for (let i = 0; i < numChats; i++) {
      const numMembers = simpleFaker.number.int({ min: 3, max: users.length });

     
      const shuffledUsers = users.sort(() => 0.5 - Math.random());
      const selectedMembers = shuffledUsers.slice(0, numMembers).map(user => user._id);

      chatPromises.push(
        ChatModel.create({
          name: faker.lorem.words(2),
          members: selectedMembers,
          groupchat:true,
          creator:creator
        })
      );
    }

    await Promise.all(chatPromises);
    console.log(`${chatPromises.length} group chats created.`);
    process.exit();
  } catch (error) {
    console.error("Error creating group chats:", error);
    process.exit(1);
  }
};


const createSampleMessage = async (numMessage) => {
  try {
    const chat = await ChatModel.find().select("_id");
    const user = await UserModel.find().select("_id");
    const ChatsPromis = [];

    for (let i = 0; i < numMessage; i++) {
      const randomUser = user[Math.floor(Math.random() * user.length)];
      const chatUser = chat[Math.floor(Math.random() * chat.length)];
      ChatsPromis.push(
        MessageModel.create({
          sender: req.user,
          chat: chatUser,
          content: faker.lorem.sentence(),
        })
      );
    }

    await Promise.all(ChatsPromis);
    console.log("created");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { createSampleMessage, createSingleChats,createGroupChats };
