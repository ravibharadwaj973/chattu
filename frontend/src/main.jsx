import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import {Provider} from 'react-redux'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <HelmetProvider>
      <CssBaseline />
     
      <div>
        <App />
      </div>
    </HelmetProvider>
    </Provider>
  </StrictMode>
);

 {/* onContextMenu={(e)=>e.preventDefault(e)} */}