import React from "react";
import { PageContainer } from "../../components";
import { UserData } from "../../utils/types";
import Home from "../Home";
import LoginCard from "./LoginCard";

interface Props {
  handleLogin: (email: string, password: string) => void;
}

const Frontpage: React.FC<Props> = ({ handleLogin }) => {
  return (
    <PageContainer>
      Frontpage
      <LoginCard handleLogin={handleLogin} />
    </PageContainer>
  );
};

export default Frontpage;
