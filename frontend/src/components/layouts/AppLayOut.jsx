import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../spicific/ChatList";
import { sampleChats } from "../../constants/sample";
import { useParams } from "react-router-dom";
import Profile from "../../pages/profile";

const AppLayOut = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;

    const handleDeleteChat = (e, _id, groupchat) => {
      console.log(e, _id, groupchat);
      e.preventDefault();
    };
    return (
      <>
        <Title title="Home Page" description="Welcome to the home page" />
        <Header />

        <Grid container height={"calc(95vh)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height={"100%"}
            width={"27rem"}
          >
            <ChatList
              chats={sampleChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Grid>
          <Grid
            item
            xs={4}
            height="100%"
            border={1}
            sx={{
              width: "37rem", // Optional: remove if using grid sizing only
              bgcolor: "background.paper", // Replace with any valid theme or color value
            }}
          >
            <WrappedComponent {...props} />
          </Grid>

          <Grid
            item
            xs={4}
            height={"100%"}
            sm={4}
            md={4}
            lg={3}
            width={"28rem"}
            bgcolor={"rgba(0,0,0,0.85)"}
            sx={{
              display: { xs: "none", sm: "block", bgcolor: "rgba(0,0,0,0.85)" },
            }}
          >
            <Profile />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayOut;
