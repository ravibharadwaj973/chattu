// Profile.jsx
import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";

// Profilecard Component
const Profilecard = ({ text, Icon, heading }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={2}
    color="white"
    textAlign="center"
    mb={2}
  >
    {Icon && <Icon style={{ fontSize: 30 }} />} {/* Ensures icons display properly */}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color="gray" variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

// Profile Component
const Profile = () => {
  return (
    <Stack alignItems="center" spacing={3} p={2}>
      <Avatar
        alt="Profile Avatar"
        src="/path/to/avatar.jpg" // Replace with actual image URL
        sx={{
          width: 200,
          height: 200,
          border: "5px solid white",
        }}
      />
      <Profilecard heading="Bio" text="sadas dasdasd anssdasdsd sad" />
      <Profilecard heading="Username" text="jahrvai004@hamsi" Icon={UsernameIcon} />
      <Profilecard heading="Name" text="Bharadwaj" Icon={FaceIcon} />
      <Profilecard
        heading="Joined"
        text={moment("2025-05-20T18:30:00.000Z").fromNow()}
        Icon={CalendarIcon}
      />
    </Stack>
  );
};

export default Profile;
