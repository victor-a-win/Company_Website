import IUser from "@/model/user.model";
import backendlessAPI from "../axios/axios.config";
import axiosError from "../axios/axios.error";
import { getCookie } from "cookies-next/client";

const backendlessLogin = async (
  login: string,
  password: string,
): Promise<IUser | undefined> => {
  try {
    const res = await backendlessAPI.post("users/login", { login, password });
    return res.data as IUser;
  } catch (e) {
    axiosError(e, "Login failed due to unexpected error");
  }
};

const backendlessRegister = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    await backendlessAPI.post("users/register", { name, email, password });
  } catch (e) {
    axiosError(e, "Registration failed due to unexpected error");
  }
};

const backendlessUserTokenGuard = async (): Promise<string | undefined> => {
  const token = getCookie("user-token");
  if (!token) throw new Error("Unauthorized: user token is missing");
  return token;
};

export { backendlessLogin, backendlessRegister, backendlessUserTokenGuard };
