import React from "react";

export const Alert = ({ alert }) => {
  return (
    <div
      className={`${
        alert.error ? "from-red-400 to-red-600" : "from-sky-400 to-sky-600"
      } bg-gradient-to-br text-center p-3 rounded-xl text.white font-bold text-sm my-1 `}
    >
      {alert.msg}
    </div>
  );
};
