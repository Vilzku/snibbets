import axios from "axios";
import {
  removeUserFromStorage,
  saveUserToStorage,
  updateUserToStorage,
} from "../storageHelper";
import { UserType } from "../types";

export const login = async (
  email: string,
  password: string
): Promise<UserType | void> => {
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
    if (err.response && err.response.status === 401) {
      logout();
      throw Error("Invalid credentials");
    } else if (err.response && err.response.status === 500) {
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
): Promise<UserType | void> => {
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
    if (err.response && err.response.status === 400) {
      throw err.response.data;
    } else if (err.response && err.response.status === 500) {
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

export const getUserInfo = async (id: string): Promise<UserType | void> => {
  try {
    const res = await axios.get(`/api/users/${id}`);
    if (res.status === 200) {
      return res.data;
    }
    throw new Error();
  } catch (err: any) {
    if (err.response && err.response.status === 500) {
      throw new Error("Server error, try again later");
    } else {
      throw new Error("Something went wrong, reload the page and try again");
    }
  }
};

export const uploadImage = async (image: File) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post("/api/users/image", formData);
    if (res.status === 200) {
      return true;
    }
    throw new Error();
  } catch (err: any) {
    if (err.response && err.response.status === 500) {
      throw new Error("Server error, try again later");
    } else {
      throw new Error("Something went wrong, reload the page and try again");
    }
  }
};

export const getImage = async (id: string) => {
  try {
    const res = await axios.get(`/api/users/image/${id}`);
    if (res.status === 200) {
      return res.data;
    } else if (res.status === 404) {
      return null;
    }
    throw new Error();
  } catch (err: any) {
    if (err.response && err.response.status === 500) {
      throw new Error("Server error, try again later");
    } else {
      throw new Error("Something went wrong, reload the page and try again");
    }
  }
};

export const patchUser = async (
  username: string | undefined,
  email: string | undefined,
  bio: string | undefined
): Promise<UserType | void> => {
  try {
    const res = await axios.patch("/api/users/", {
      username,
      email,
      bio,
    });
    if (res.status === 200) {
      if (res.data.username) updateUserToStorage(res.data.username);
      return res.data;
    }
    throw new Error();
  } catch (err: any) {
    if (err.response && err.response.status === 500) {
      throw new Error("Server error, try again later");
    } else {
      throw new Error("Something went wrong, reload the page and try again");
    }
  }
};
