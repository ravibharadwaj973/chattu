import { Box, Typography } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import moment from "moment";
import React from "react";
import { fileFormate } from "../../lib/faecture";
import RenderAttectments from "../shared/RenderAttectments";

const MessageComponents = ({ message, user }) => {
  const { attachments = [], content, sender, createdAt } = message;
  const samesender = sender?._id === user._id;
  const timeAgo = moment(createdAt).fromNow();
  console.log(attachments)
  return (
    <div
      style={{
        alignSelf: samesender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      MessageComponents
      {!samesender && (
        <Typography color={lightBlue} variant="caption" fontWeight={"600"}>
          {sender.name}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}
      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormate(url);
          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                }}
              >{
               RenderAttectments(file,url)
              }
       
              </a>
            </Box>
          );
        })}
      <Typography variant="caption" color={"text, secondary"}>
       
        {timeAgo}
      </Typography>
    </div>
  );
};

export default MessageComponents;
