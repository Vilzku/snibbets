import { UserData } from "./types";

export const getUserFromStorage = (): UserData | null => {
  if (isLoginExpired()) return null;
  const username = localStorage.getItem("username");
  const id = localStorage.getItem("user_id");
  if (username && id) {
    return { username, id };
  }
  return null;
};

export const saveUserToStorage = (data: UserData, expirationTime: number) => {
  localStorage.setItem("username", data.username);
  localStorage.setItem("user_id", data.id);
  localStorage.setItem(
    "login_expiration",
    (new Date().getTime() + expirationTime).toString()
  );
};

export const removeUserFromStorage = () => {
  localStorage.removeItem("login_expiration");
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
};

export const isLoginExpired = () => {
  const expiration = localStorage.getItem("login_expiration");
  if (!expiration) {
    removeUserFromStorage();
    return true;
  }

  if (new Date() > new Date(expiration)) {
    removeUserFromStorage();
    return true;
  }
  return false;
};
