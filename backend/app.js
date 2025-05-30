import express from "express";
import dotenv from "dotenv";
import connectDB, { getSockets } from "./utils/feature.js";
import appRout from "./routes/user.js";
import errorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";
import chatRoute from "./routes/chat.js";
import adminRout from "./routes/admin.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/event.js";
import { v4 as uuid } from "uuid";


dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON
const server = createServer(app);
const io = new Server(server, {});
const userSocketId=new Map()

// Connect to MongoDB
connectDB(process.env.MONGO_URI);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/user", appRout);
app.use("/chat", chatRoute);
app.use("/admin", adminRout);

app.use(errorMiddleware);

io.on("connection", (socket) => {
  console.log("socket connect", socket.id);
  const users = {
    _id: "bfjv",
    name: "jeshfk",
  };
  userSocketId.set(users._id,socket.id)
socket.on(NEW_MESSAGE, async ({ chatId, message, members }) => {
  try {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: users._id,
        name: users.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageforDB = {
      content: message,
      sender: users._id,
      chat: chatId,
    };

    const memberssocket = getSockets(members);
    
    io.to(memberssocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });

    io.to(memberssocket).emit(NEW_MESSAGE_ALERT, { chatId });

     io.to(memberssocket).emit(NEW_MESSAGE_ALERT,{chatId})

  } catch (err) {
    console.error("NEW_MESSAGE error:", err);
  }
});

 

  socket.on("disconnect", () => {
    console.log("socket disconnect", socket.id);
    userSocketId.delete(users._id.toString())
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
export {userSocketId}