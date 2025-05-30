import "./App.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import Loder from "./components/layouts/Loder";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/group"));

const AdminLogin = lazy(() => import('./pages/admin/adminLogin'));
const DashBoard = lazy(() => import("./pages/admin/dashBoard"));
const ChatMangement = lazy(() => import("./pages/admin/ChatMangement"));
const Messagemangement = lazy(() => import("./pages/admin/Messagemangement"));
const UserMangment = lazy(() => import("./pages/admin/UserMangment"));


const NotFound = lazy(() => import("./pages/NotFound"));

let user = true;

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loder />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/groups" element={<Group />} />
            <Route path="/chat/:chatId" element={<Chat />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          <Route path="/admin/login" element={<AdminLogin />} />
           <Route path="/admin/dashboard" element={<DashBoard/>} />
           <Route path="/admin/chat" element={<ChatMangement/>} />
           <Route path="/admin/message" element={<Messagemangement/>} />
           <Route path="/admin/user" element={<UserMangment/>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
//
//        
