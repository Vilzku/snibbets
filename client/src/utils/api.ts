import axios from "axios";
import { saveUserToStorage } from "./storageHelper";
import { UserData } from "./types";

const login = async (
  email: string,
  password: string
): Promise<UserData | void> => {
  try {
    const res = await axios.post("/api/users/login", {
      email,
      password,
    });
    if (res.status === 200) {
      saveUserToStorage(res.data);
      return res.data;
    }
  } catch (err: any) {
    if (err.response.status === 401) {
      logout();
      throw Error("Invalid credentials");
    } else if (err.response.status === 500) {
      throw Error("Server error, try again later");
    } else {
      throw Error("Something went wrong, reload the page and try again");
    }
  }
};

const logout = () => {
  localStorage.clear();
};

export { login, logout };
