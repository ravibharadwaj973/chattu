import React from "react";
import { transformImage } from "../../lib/faecture";
import { FileOpen } from "@mui/icons-material";

const RenderAttectments = (file, url) => {
  switch (file) {
    case "video":
      return <video src={url} controls preload="none" width={"200px"} />;
      

    case "image":
    return  <img
        src={transformImage(url ,200)}
        alt="Attachement"
        width={"200px"}
        height={"200px"}
      />;
    
       case "audio":
     return <audio src={url} controls preload="none"  />;
     

    default:
      <FileOpen/>
  }
};

export default RenderAttectments;
