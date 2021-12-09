import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Container } from ".";
import { Button, Card, Header, TextInput } from "../../../components";
import { UserData } from "../../../utils/types";

interface Props {
  handleLogin: (userData: UserData) => void;
}

const LoginCard: React.FC<Props> = ({ handleLogin }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string>();

  const login = async () => {
    // TODO: check empty fields
    try {
      const res = await axios.post("/api/users/login", {
        email,
        password,
      });
      if (res.status === 200) handleLogin(res.data);
    } catch (err: any) {
      if (err.response.status === 401) {
        setError("Invalid credentials");
      } else if (err.response.status === 500) {
        setError("Server error, try again later");
      } else {
        setError("Something went wrong, reload the page and try again");
      }
    }
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
        {error && <p>{error}</p>}
      </Container>
    </Card>
  );
};

export default LoginCard;
