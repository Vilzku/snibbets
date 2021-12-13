import passwordValidator from "password-validator";
import { isEmailTaken, isUsernameTaken } from "../db/helpers";

const schema = new passwordValidator();

// prettier-ignore
schema
  .is().min(8, "Password should be atleast 8 characters long")
  .is().max(255, "Password is too long")
  .has().uppercase(1, "Password should contain atleast one uppercase character")
  .has().lowercase(1, "Password should contain atleast one lowercase character")
  .has().digits(1, "Password should contain atleast one number")
  .has().not().spaces(1, "Password should not contain spaces");

export const validatePassword = (password: string) => {
  const result = schema.validate(password, {
    details: true,
  });

  if ((result as []).length > 0) {
    throw (result as []).map((err: { message: string }) => {
      return err.message;
    });
  }
  return true;
};

export const checkUsernameAvailability = async (username: string) => {
  const result = await isUsernameTaken(username.toLowerCase());
  if (result) return Promise.reject("Username is already taken");
  return true;
};

export const checkEmailAvailability = async (email: string) => {
  const result = await isEmailTaken(email);
  if (result) return Promise.reject("Email is already taken");
  return true;
};
