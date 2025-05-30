import React, { use, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton, Stack, styled, Typography } from "@mui/material";
import { Link, Navigate, useLocation } from "react-router-dom";

import {
  Dashboard,
  ExitToApp,
  Group,
  ManageAccounts,
  Message,
} from "@mui/icons-material";

// Sidebar Component

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();

  const adminTabs = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <Dashboard className="mr-2" />,
    },
    {
      name: "Users",
      path: "/admin/user",
      icon: <ManageAccounts className="mr-2" />,
    },
    {
      name: "Chats",
      path: "/admin/chat",
      icon: <Group className="mr-2" />,
    },
    {
      name: "Messages",
      path: "/admin/message",
      icon: <Message className="mr-2" />,
    },
  ];
  const LogoutHandler = () => {
    console.log("Logout clicked");
  };

  return (
    <Stack width={w} className="p-4">
      <Typography variant="h6" gutterBottom>
        Admin Menu
      </Typography>
      <Stack spacing={1}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex items-center p-2 rounded-md transition-colors duration-200 ${
              location.pathname === tab.path
                ? "bg-gray-300 font-medium"
                : "hover:bg-gray-200"
            }`}
          >
            {tab.icon}
            {tab.name}
          </Link>
        ))}

        <Link className="flex items-center p-2 rounded-md hover:bg-gray-200 gap-3"  onClick={LogoutHandler}>
          <ExitToApp /> <h3>Logout</h3>
        </Link>
      </Stack>
    </Stack>
  );
};

const isAdmin=true;
const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobile((prev) => !prev);
  };

  const closeDrawer = () => {
    setIsMobile(false);
  };
  if (!isAdmin) return <Navigate to="/login"  />;

  return (
    <>
      {/* Mobile Header */}
      <div className="block md:hidden sticky top-0 right-0 bg-white p-4 shadow z-10 flex items-center justify-between">
        <IconButton onClick={toggleMobileSidebar}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
      </div>

      {/* Layout */}
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-12">
        {/* Sidebar for Desktop */}
        <div className="hidden md:block md:col-span-4 lg:col-span-3 bg-white border-r border-gray-200 h-screen">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-span-1 md:col-span-8 lg:col-span-9 bg-gray-100 p-6">
          {children}
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <Drawer anchor="left" open={isMobile} onClose={closeDrawer}>
        <Sidebar w="250px" />
      </Drawer>
    </>
  );
};

export default AdminLayout;
