import { pool } from ".";

export const isUsernameAvailable = async (
  username: string
): Promise<boolean> => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  if (result.rows.length > 0) {
    return false;
  }
  return true;
};

export const isEmailAvailable = async (email: string): Promise<boolean> => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (result.rows.length > 0) {
    return false;
  }
  return true;
};
