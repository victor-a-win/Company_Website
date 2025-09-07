import IUser from "@/model/user.model";
import backendlessAPI from "../axios/axios.config";
import axiosError from "../axios/axios.error";

const getBackendlessUser = async (
  token: string | undefined | null,
  objectId: string,
): Promise<IUser | undefined> => {
  try {
    const res = await backendlessAPI.get(`data/Users/${objectId}`, {
      headers: {
        "user-token": token,
      },
    });
    return res.data as IUser;
  } catch (e) {
    axiosError(e, "Login failed due to unexpected error");
  }
};

export { getBackendlessUser };
