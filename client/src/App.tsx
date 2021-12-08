import React from "react";
import { Routes, Route } from "react-router-dom";
import Frontpage from "./views/Frontpage";
import Home from "./views/Home";
import NavBar from "./views/NavBar";

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
