import axios from "axios";
import { removeUserFromStorage, saveUserToStorage } from "../storageHelper";
import { UserData } from "../types";

export const login = async (
  email: string,
  password: string
): Promise<UserData | void> => {
  try {
    const res = await axios.post("/api/users/login", {
      email,
      password,
    });
    if (res.status === 200) {
      saveUserToStorage(res.data, 24 * 60 * 60 * 1000);
      return res.data;
    }
    throw new Error();
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

export const logout = () => {
  removeUserFromStorage();
};

export const register = async (
  email: string,
  password: string,
  username: string
): Promise<UserData | void> => {
  try {
    const res = await axios.post("/api/users/register", {
      email,
      password,
      username,
    });
    if (res.status === 200) {
      saveUserToStorage(res.data, 24 * 60 * 60 * 1000);
      return res.data;
    }
    throw new Error();
  } catch (err: any) {
    if (err.response.status === 400) {
      throw err.response.data;
    } else if (err.response.status === 500) {
      throw new Error("Server error, try again later");
    } else {
      throw new Error("Something went wrong, reload the page and try again");
    }
  }
};

export interface RegisterError {
  value: string;
  msg: string | string[];
  param: "email" | "password" | "username";
  location?: string;
}

export const getUserInfo = async (id: string): Promise<UserData | void> => {
  try {
    const res = await axios.get(`/api/users/${id}`);
    if (res.status === 200) {
      return res.data;
    }
    throw new Error();
  } catch (err: any) {
    if (err.response.status === 500) {
      throw new Error("Server error, try again later");
    } else {
      throw new Error("Something went wrong, reload the page and try again");
    }
  }
};
