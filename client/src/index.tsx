import React from "react";
import "./assets/fonts/fonts.css";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "normalize.css";
import { ThemeProvider } from "styled-components";
import App from "./App";
import theme from "./assets/theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
