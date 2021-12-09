import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserData } from "./utils/types";
import Frontpage from "./views/Frontpage";
import Home from "./views/Home";
import NavBar from "./views/NavBar";
import SnippetView from "./views/SnippetView";

function App() {
  const navigate = useNavigate();

  const handleLogin = (user: UserData) => {
    localStorage.setItem("username", user.username);
    localStorage.setItem("user_id", user.id);
    navigate("/home");
  };

  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Frontpage handleLogin={handleLogin} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/:id" element={<SnippetView />} />
      </Routes>
    </>
  );
}

export default App;
