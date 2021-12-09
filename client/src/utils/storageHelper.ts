import { UserData } from "./types";

export const getUserFromStorage = (): UserData | null => {
  const username = localStorage.getItem("username");
  const id = localStorage.getItem("user_id");
  if (username && id) {
    return { username, id };
  }
  return null;
};

export const saveUserToStorage = (data: UserData) => {
  localStorage.setItem("username", data.username);
  localStorage.setItem("user_id", data.id);
};
