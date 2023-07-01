import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Box } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Box className="mainLayout">
    <React.StrictMode>
      <header>
        <Header />
      </header>
      <main>
        <App />
      </main>
      <footer>
        <Footer />
      </footer>
    </React.StrictMode>
  </Box>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
