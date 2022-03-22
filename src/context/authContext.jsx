import { createContext, useState, useEffect } from "react";
import clientAxios from "../axios/clientAxios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "aplication/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clientAxios.get("/user/profile", config);

        setAuth(data);
      } catch (error) {
        localStorage.removeItem("token");
      }
      setLoading(false);
    };

    authUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
