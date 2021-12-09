import React from "react";
import { Page } from "../../components";
import { UserData } from "../../utils/types";
import Home from "../Home";
import LoginCard from "./LoginCard";

interface Props {
  handleLogin: (userData: UserData) => void;
}

const Frontpage: React.FC<Props> = ({ handleLogin }) => {
  if (localStorage.getItem("user_id")) return <Home />;

  return (
    <Page>
      Frontpage
      <LoginCard handleLogin={handleLogin} />
    </Page>
  );
};

export default Frontpage;
