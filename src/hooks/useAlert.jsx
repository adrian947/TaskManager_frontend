import { useState } from "react";

export const useAlert = () => {
  const [alert, setAlert] = useState({});

  const showAlert = (msg, typeError) => {
    setAlert({
      msg: msg,
      error: typeError,
    });
    setTimeout(() => {
      setAlert({});
    }, 2000);
  };

  return { alert, showAlert };
};
