import React from "react";
import { Link } from "react-router-dom";
import { Container } from ".";
import { Button, Card, Header, TextInput } from "../../../components";
import { login } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../../utils/types";

interface Props {
  handleLogin: (email: string, password: string) => void;
}

const LoginCard: React.FC<Props> = ({ handleLogin }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string>();

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      handleLogin(email, password);
    } catch (error: any) {
      setError(error.message);
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
        <Button onClick={handleClick}>Login</Button>
        <Link to="/signup">Sign up</Link>
        {error && <p>{error}</p>}
      </Container>
    </Card>
  );
};

export default LoginCard;
