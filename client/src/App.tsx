import React from "react";
import { Routes, Route } from "react-router-dom";
import Frontpage from "./views/Frontpage";
import NavBar from "./views/NavBar";

function App() {
  return (
    <div>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Frontpage />} />
      </Routes>
    </div>
  );
}

export default App;
