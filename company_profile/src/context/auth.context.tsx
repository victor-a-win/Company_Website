"use client";
import { getBackendlessUser } from "@/libs/backendless/backendless.user";
import IUser from "@/model/user.model";
import {
  deleteCookie,
  getCookie,
  hasCookie,
  setCookie,
} from "cookies-next/client";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

export interface AuthContextProps {
  user: IUser | null;
  signIn: (user: IUser) => void;
  persistUser: () => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    persistUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = (user: IUser) => {
    setUser(user);
    toast.success("Login successful");
    setCookie("user-token", user["user-token"]);
    setCookie("userId", user.objectId);
    router.push("/");
  };

  const signOut = () => {
    setUser(null);
    toast.success("See You Soon!");
    deleteCookie("user-token");
    deleteCookie("userId");
    router.push("/sign-in");
  };

  const persistUser = async () => {
    if (hasCookie("user-token") && hasCookie("userId")) {
      const user = await getBackendlessUser(
        getCookie("user-token"),
        getCookie("userId") as string,
      );
      if (user) {
        setUser(user);
      } else {
        signOut();
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, persistUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
