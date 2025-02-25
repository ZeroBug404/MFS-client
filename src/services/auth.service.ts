import { decodedToken } from "../helpers/utils/jwt";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../helpers/utils/saveData";

export interface JwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

interface ExtendedJwtPayload extends JwtPayload {
  role?: string;
}

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage("accessToken", accessToken as string);
};

export const getUserInfo = (): ExtendedJwtPayload | null | string => {
  const authToken = getFromLocalStorage("accessToken");
  // console.log(authToken);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData as ExtendedJwtPayload;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage("accessToken");
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};

export const getUserToken = () => {
  const authToken = getFromLocalStorage("accessToken");
  if (authToken) {
    return authToken;
  } else {
    return "";
  }
};
