import React from 'react';
import { Stack } from "@mui/material";
import ChatItem from '../shared/ChatItem';
const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={'column'} height={'100%'} overflow={'auto'} gap={1} p={1}>
      {chats.map((data,index) => {
        const { avatar, name, _id, groupchat, members } = data;

        const newMessageAlert = newMessagesAlert.find(({chatId}) => chatId === _id);
        const isOnline = members 
          ? members.some((memberId) => onlineUsers.includes(memberId)) 
          : onlineUsers.includes(_id);

        return (
          <ChatItem
    index={index}
            key={_id}
            avatar={avatar}
            name={name}
            _id={_id}
            groupchat={groupchat}
            isOnline={isOnline}
            newMessagesAlert={newMessageAlert}
            handleDeleteChat={handleDeleteChat}
            sameSender={chatId===_id}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
