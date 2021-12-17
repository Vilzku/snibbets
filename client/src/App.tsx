import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Page } from "./components";
import { logoutUser } from "./utils/api/users";
import {
  getUserFromStorage,
  isLoginExpired,
  removeUserFromStorage,
} from "./utils/storageHelper";
import Frontpage from "./views/Frontpage";
import Home from "./views/Home";
import NavBar from "./views/NavBar";
import Register from "./views/Register";
import SnippetView from "./views/SnippetView";
import User from "./views/User";

const App: React.FC = () => {
  const [user, setUser] = React.useState<{
    username: string;
    id: string;
  } | null>(getUserFromStorage());
  const navigate = useNavigate();

  // Check if user login has expired
  const { pathname } = useLocation();
  useEffect(() => {
    if (isLoginExpired()) setUser(null);
  }, [pathname]);
  // TODO: Refresh cookie if login is going to expire soon?

  const handleLogin = async (user: { username: string; id: string }) => {
    setUser(user);
  };

  const handleLogout = async () => {
    if (await logoutUser()) {
      removeUserFromStorage();
      setUser(null);
      navigate("/");
    }
  };

  return (
    <Page>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Home userId={user.id} />
            ) : (
              <Frontpage handleLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/signup"
          element={<Register userId={user?.id} setUser={setUser} />}
        />
        <Route path="/home" element={<Home userId={user?.id} />} />
        <Route path="/user/:id" element={<User userId={user?.id} />} />
        <Route
          path="/snippet/:id"
          element={<SnippetView userId={user?.id} />}
        />
      </Routes>
    </Page>
  );
};

export default App;
