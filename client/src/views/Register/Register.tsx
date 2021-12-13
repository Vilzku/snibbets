import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from ".";
import { PageContainer } from "../../components";
import Info from "./Info";
import RegisterCard from "./RegisterCard";

interface Props {
  userId: string | undefined;
  setUser: (user: { username: string; id: string }) => void;
}

const Register: React.FC<Props> = ({ userId, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) navigate("/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <PageContainer>
      <Container>
        <Info />
        <RegisterCard setUser={setUser} userId={userId} />
      </Container>
    </PageContainer>
  );
};

interface Props {}

export default Register;
