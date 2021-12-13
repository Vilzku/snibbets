import React from "react";
import { BottomInfo, Container, ImageUpload, RegisterForm } from ".";
import { Card, Link } from "../../../components";

interface Props {
  userId: string | undefined;
  setUser: (user: { username: string; id: string }) => void;
}

const RegisterCard: React.FC<Props> = ({ userId, setUser }) => {
  return (
    <Container>
      <Card>
        {!userId ? (
          <RegisterForm
            setUser={(user: { username: string; id: string }) => setUser(user)}
          />
        ) : (
          <ImageUpload />
        )}
      </Card>
      <BottomInfo>
        {!userId ? (
          <>
            {"Already have an account?"} <Link to="/">{"Log in"}</Link>
          </>
        ) : (
          <Link to="/home" center>
            {"Skip for now"}
          </Link>
        )}
      </BottomInfo>
    </Container>
  );
};

export default RegisterCard;
