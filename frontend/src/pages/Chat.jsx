import React, { Fragment, useRef, useState } from "react";
import AppLayOut from "../components/layouts/AppLayOut";
import { IconButton, Input, Stack } from "@mui/material";
import { graycolor } from "../constants/color";
import { AttachFile, Send } from "@mui/icons-material";
import FileMenu from "../components/dailogs/FileMenu";
import { sampleMessage } from "../constants/sample";
import MessageComponents from "../components/styles/MessageComponents";

function Chat() {
  const containerRef = useRef(null);

 const user={
  _id:'hbsbdfc',
  name:'abhiNhi'
 }

  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleFileMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleFileMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <Fragment>
      <Stack
        ref={containerRef}
        sx={{
          boxSizing: "border-box",
          padding: "1rem",
          bgcolor: graycolor,
          height: "90%",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
       {
        sampleMessage.map((i)=> <MessageComponents key={i._id} message={i} user={user}/>)
       }
      </Stack>

      <form style={{ height: "10%" }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            sx={{ rotate: "30deg" }}
            onClick={handleFileMenuOpen}
          >
            <AttachFile />
          </IconButton>

          <Input fullWidth placeholder="Type a message..." />

          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              bgcolor: "orange",
              color: "white",
              ml: "1rem",
              p: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <Send />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorEl={menuAnchor} onClose={handleFileMenuClose} />
    </Fragment>
  );
}

export default AppLayOut()(Chat);
