import React from "react";
import { Link } from "react-router-dom";
import { BottomInfo, Container } from ".";
import { Button, Card, TextInput } from "../../../components";
import { register, RegisterError } from "../../../utils/api";

interface Props {}

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RegisterCard: React.FC<Props> = () => {
  const [data, setData] = React.useState<FormData>({} as FormData);
  const [errors, setErrors] = React.useState<RegisterError[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    setErrors([]);
    if (!validateFields()) return;
    try {
      await register(data.email, data.password, data.username);
    } catch (error: any) {
      setErrors(error);
    }
  };

  /**
   * Check that all fields are filled
   * @returns true if all fields are valid
   */
  const validateFields = () => {
    const { email, password, username } = data;
    let success = true;
    if (!email || email.length === 0) {
      success = false;
      setErrors((errors) => [
        ...errors,
        { value: "", param: "email", msg: "Email is required" },
      ]);
    }
    if (!password || password.length === 0) {
      success = false;

      setErrors((errors) => [
        ...errors,
        { value: "", param: "password", msg: "Password is required" },
      ]);
    }
    if (!username || username.length === 0) {
      success = false;

      setErrors((errors) => [
        ...errors,
        { value: "", param: "username", msg: "Username is required" },
      ]);
    }
    return success;
  };

  /**
   * Format the error messages to be displayed
   * @returns the error message
   */
  const getErrorMessage = (name: string): string => {
    let message = "";
    errors.forEach((error) => {
      if (error.param === name) {
        if (typeof error.msg === "string") message = error.msg;
        else {
          if (name === "password") {
            message = "Password should \n";
            error.msg.forEach((msg) => {
              message += `   • ${msg.replace("Password should ", "")}\n`;
            });
          } else {
            error.msg.forEach((err) => {
              message += `   • ${err}\n`;
            });
          }
        }
      }
    });
    return message;
  };

  return (
    <Container>
      <Card>
        <TextInput
          label="Display name"
          type="text"
          name="username"
          onChange={handleChange}
          error={getErrorMessage("username")}
        />
        <TextInput
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
          error={getErrorMessage("email")}
        />
        <TextInput
          label="Password"
          type="password"
          name="password"
          hint="Password must be at least eight characters, including at least 1 uppercase letter and 1 number."
          onChange={handleChange}
          error={getErrorMessage("password")}
        />
        <Button onClick={handleSubmit}>Sign up</Button>
      </Card>
      <BottomInfo>
        Already have an account? <Link to="/">Log in</Link>
      </BottomInfo>
    </Container>
  );
};

export default RegisterCard;
