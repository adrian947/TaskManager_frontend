import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <main className='container mx-auto md:mt-5 md:flex md:justify-center'>
      <div className='md:w-2/3 lg:w-1/2'>
        <Outlet />
      </div>
    </main>
  );
};
