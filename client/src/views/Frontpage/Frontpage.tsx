import React from "react";
import { LoginCard } from ".";
import { PageContainer } from "../../components";

interface Props {
  handleLogin: (user: { username: string; id: string }) => void;
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
