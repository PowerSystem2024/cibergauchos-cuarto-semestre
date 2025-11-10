import { createContext, useContext, useState, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "../api/axios.js";

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const signin = async (data) => {
    try {
      const res = await axios.post("/api/signin", data);
      setUser(res.data);
      setIsAuth(true);
      return res.data;
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data]);
    }
  };

  const signup = async (data) => {
    try {
      const res = await axios.post("/api/signup", data, {
        withCredentials: true,
      });
      setUser(res.data.user);
      setIsAuth(true);
      setErrors(null);
      return res.data;
    } catch (error) {
      console.log(error);
      if (error.response && Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      } else if (error.response && error.response.data) {
        setErrors([error.response.data]);
      }
    }
  };

  const signout = async () => {
    const res = await axios.post("/api/signout", null, {
      withCredentials: true,
    });
    setUser(null);
    setIsAuth(false);
    return res.data;
  };

  useEffect(() => {
    setLoading(true);
    if (Cookie.get("token")) {
      axios
        .get("/profile", { withCredentials: true })
        .then((res) => {
          setUser(res.data);
          setIsAuth(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setUser(null);
          setIsAuth(false);
        });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrors(null);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errors,
        signup,
        setUser,
        setIsAuth,
        setErrors,
        signin,
        signout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
