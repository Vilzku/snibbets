import React from "react";
import "./assets/fonts/fonts.css";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "normalize.css";
import { ThemeProvider } from "styled-components";
import App from "./App";
import theme from "./assets/theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
