import passwordValidator from "password-validator";

const schema = new passwordValidator();

// prettier-ignore
schema
  .is().min(8, "Password should be atleast 8 characters long")
  .is().max(255, "Password is too long")
  .has().uppercase(1, "Password should contain atleast one uppercase character")
  .has().lowercase(1, "Password should contain atleast one lowercase character")
  .has().digits(1, "Password should contain atleast one number")
  .has().not().spaces(1, "Password should not contain spaces");

const validatePassword = (password: string) => {
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

export default validatePassword;
