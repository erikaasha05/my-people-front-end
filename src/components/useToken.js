import React, { useState } from "react";

const getToken = () => {
  const userToken = localStorage.getIten("token");
  return userToken && userToken;
};

const useToken = () => {
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  };
  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return {
    setToken: saveToken,
    token,
    removeToken,
  };
};

export default useToken;
