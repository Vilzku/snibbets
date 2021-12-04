import React from "react";
import { Link } from "react-router-dom";
import { Container } from ".";
import { Button, Card, Header, TextInput } from "../../../components";

const LoginCard = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = () => {
    console.log("login");
  };

  return (
    <Card width="25rem">
      <Container>
        <Header>Login</Header>
        <TextInput
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={login}>Login</Button>
        <Link to="/">Register</Link>
      </Container>
    </Card>
  );
};

export default LoginCard;
