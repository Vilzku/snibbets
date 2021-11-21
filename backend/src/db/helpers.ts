import { pool } from ".";

export const isUsernameTaken = async (username: string): Promise<boolean> => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  if (result.rows.length > 0) {
    return true;
  }
  return false;
};

export const isEmailTaken = async (email: string): Promise<boolean> => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (result.rows.length > 0) {
    return true;
  }
  return false;
};
