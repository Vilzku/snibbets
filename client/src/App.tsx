import React from "react";
import { Routes, Route } from "react-router-dom";
import { Page } from "./components";
import { login } from "./utils/api";
import { getUserFromStorage } from "./utils/storageHelper";
import { UserData } from "./utils/types";
import Frontpage from "./views/Frontpage";
import Home from "./views/Home";
import NavBar from "./views/NavBar";
import Register from "./views/Register";
import SnippetView from "./views/SnippetView";

const App: React.FC = () => {
  const [user, setUser] = React.useState<UserData | null>(getUserFromStorage());

  const handleLogin = async (email: string, password: string) => {
    try {
      const user = await login(email, password);
      if (user) setUser(user);
    } catch (error: any) {
      throw error;
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Page>
      <NavBar user={user} />
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Frontpage handleLogin={handleLogin} />}
        />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/:id" element={<SnippetView />} />
      </Routes>
    </Page>
  );
};

export default App;
