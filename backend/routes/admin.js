import express from "express";
import { adminlogin, adminlogout, allChats, allMessages, allusers, getAdminData, getDashBoard } from "../controllers/admin.js";
import { adminloginValidor, validatehandler } from "../lib/validators.js";
import { admin } from "../middleware/Auth.js";

const app = express.Router();
app.get("/users",admin, allusers);
app.get("/chat",admin, allChats);
app.get("/message",admin, allMessages);
app.get("/dashboard",admin, getDashBoard);
app.get("/",admin, getAdminData);


app.get("/login",adminloginValidor(),validatehandler, adminlogin);
app.get("/logout", adminlogout);


export default app;
