import { Menu } from "@mui/material";
import React from "react";

const FileMenu = ({ anchorEl, onClose }) => {
  return (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
    >
      <div style={{ width: "10rem", padding: "1rem" }}>
        Upload options or actions go here.
      </div>
    </Menu>
  );
};

export default FileMenu;
