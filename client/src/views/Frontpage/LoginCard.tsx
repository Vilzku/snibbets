import React from "react";
import { Button, Card, TextInput, Link } from "../../components";
import { login } from "../../utils/api/users";

interface Props {
  handleLogin: (user: { username: string; id: string }) => void;
}

const LoginCard: React.FC<Props> = ({ handleLogin }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string>();

  const handleClick = async () => {
    try {
      const user = await login(email, password);
      if (user) handleLogin(user);
      else
        throw new Error("Something went wrong, refresh the page and try again");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Card width="25rem">
      <form>
        <TextInput
          type="email"
          value={email}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          type="password"
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <Button onClick={handleClick}>Login</Button>
      <Link to="/signup">Sign up</Link>
      {error && <p>{error}</p>}
    </Card>
  );
};

export default LoginCard;
