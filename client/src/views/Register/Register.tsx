import React from "react";
import { Container } from ".";
import { PageContainer } from "../../components";
import Info from "./Info";
import RegisterCard from "./RegisterCard";

interface Props {}

const Register: React.FC<Props> = () => {
  return (
    <PageContainer>
      <Container>
        <Info />
        <RegisterCard />
      </Container>
    </PageContainer>
  );
};

interface Props {}

export default Register;
