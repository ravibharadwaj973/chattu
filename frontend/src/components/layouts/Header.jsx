import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import { orange } from "../../constants/color";
import {
  Add,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogOutIcon,
  Notifications,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [mobile,setMobile]=useState(false)
  const [isSeacrch,setIsSeacrch]=useState(false)
  const [isNewGroup,setIsNewGroup]=useState(false)
  const [notification,setNotification]=useState(false)
  const Search=lazy(()=>import('../spicific/search'))
  const Notification=lazy(()=>import('../spicific/Notification'))
  const NewGroup=lazy(()=>import('../spicific/NewGroup'))

  const handelMobile = () => {
    setMobile((prev)=>!prev)
  };
  const openSeachDialog = () => {
    setIsSeacrch((prev)=>!prev)
  };
  const openNewGroup = () => {
    setIsNewGroup((prev)=>!prev)
  };
  const openNotification = () => {
    setNotification((prev)=>!prev)
  };

  const logOutHandler = () => {
    console.log("chal LogOut");
  };
  const navigateToGroup = () => navigate("/groups");

  return (
    <>
    <Box sx={{ flexGrow: 1 }} height="4rem">
      <AppBar position="static" sx={{ bgcolor: orange }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left: Logo & Mobile Menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Chattu
            </Typography>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handelMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Right: Action Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconBtn title="Search" icon={<SearchIcon />} onClick={openSeachDialog} />
            <IconBtn title="Add" icon={<Add />} onClick={openNewGroup} />
            <IconBtn title="Manage Groups" icon={<GroupIcon />} onClick={navigateToGroup} />
            <IconBtn title="Logout" icon={<LogOutIcon />} onClick={logOutHandler} />
            <IconBtn title="Notification" icon={<Notifications/>} onClick={openNotification} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
      { isSeacrch && (
        <Suspense fallback={ <Backdrop open/> }>
            
      <Search/>
        </Suspense>
      )}
      { notification && (
        <Suspense fallback={ <Backdrop open/> }>
            
      <Notification/>
        </Suspense>
      )}
      { isNewGroup && (
        <Suspense fallback={ <Backdrop open/> }>
            
      <NewGroup/>
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick }) => (
  <Tooltip title={title}>
    <IconButton color="inherit" size="large" onClick={onClick}>
      {icon}
    </IconButton>
  </Tooltip>
);

export default Header;
