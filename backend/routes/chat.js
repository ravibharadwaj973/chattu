import express from "express";
import {
  addMember,
  chatdetails,
  deleteChat,
  getMessage,
  getmyChat,
  getmyGroup,
  leaveGroup,
  newGroup,
  removeMember,
  renameGroup,
  sendAttachments,
} from "../controllers/chat.js";
import {isAuthenticate} from "../middleware/Auth.js";
import { attectmentsMulter } from "../middleware/multer.js";
import { addMemberValidor, chatId, getMessageValidator, leaveMemberValidor, newGroupValidor, removeMemberValidor, SendAttectmentValidor, validatehandler } from "../lib/validators.js";

const app = express.Router();
app.post("/new", isAuthenticate,newGroupValidor(),validatehandler, newGroup);
app.get("/my", isAuthenticate, getmyChat);
app.get("/my/groups", isAuthenticate, getmyGroup);
app.put("/addmembers", isAuthenticate,addMemberValidor(),validatehandler, addMember);
app.delete("/removemember", isAuthenticate,removeMemberValidor(),validatehandler, removeMember);
app.delete("/leave/:id", isAuthenticate,leaveMemberValidor(),validatehandler, leaveGroup);
//send Attectments
app.post("/message", isAuthenticate, attectmentsMulter,SendAttectmentValidor(),validatehandler, sendAttachments);
app.get("/message/:id", isAuthenticate,getMessageValidator(),validatehandler, getMessage);

//should be at bottom
app.get("/:id", isAuthenticate,chatId,validatehandler, chatdetails);
app.put("/:id", isAuthenticate,chatId,validatehandler,  renameGroup);
app.delete("/:id", isAuthenticate,chatId,validatehandler,  deleteChat);

export default app;
