import express from "express";
import {

  acceptFriendrequest,
  getAllNotifications,
  getFriends,
  getmyProfile,
  login,
  newUser,
  Search,
  sendFriendrequest,
} from "../controllers/user.js";
import { singleFile } from "../middleware/multer.js";
import {isAuthenticate} from "../middleware/Auth.js";
import {
    acceptRequestValidar,
  loginValidor,
  registerValidor,
  sendRequestValidar,
  validatehandler,
} from "../lib/validators.js";

const app = express.Router();

app.post("/register", singleFile, registerValidor(), validatehandler, newUser);
app.post("/login", loginValidor(), validatehandler, login);

app.get("/me", isAuthenticate, getmyProfile);

app.post("/search", isAuthenticate, Search);
app.put("/sendfriendrequest",isAuthenticate,sendRequestValidar(),validatehandler,sendFriendrequest);
app.get("/acceptfriendrequest",isAuthenticate,acceptRequestValidar(),validatehandler,acceptFriendrequest);
app.get("/notification",isAuthenticate,getAllNotifications);
app.get("/friends",isAuthenticate,getFriends);

export default app;

