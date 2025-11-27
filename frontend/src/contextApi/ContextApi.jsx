import { createContext, useContext, useState } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const getToken = localStorage.getItem("JWT_TOKEN")
    ? JSON.parse(localStorage.getItem("JWT_TOKEN"))
    : null;

  const [token, setToken] = useState(getToken);

  return (
    <ContextApi.Provider value={{ token, setToken }}>
      {children}
    </ContextApi.Provider>
  );
};

export const useStoreContext = () => useContext(ContextApi);
