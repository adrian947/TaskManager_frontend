import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import clientAxios from "../axios/clientAxios";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      setAlert({
        msg: "Email required",
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 2000);
      return;
    }

    try {
      const { data } = await clientAxios.post(`/user/forgot-password`, {
        email,
      });

      setAlert({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 2000);
    }
  };

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Get a new
        <span className='text-slate-700'> password</span>{" "}
      </h1>
      <form
        className='my-10 bg-white shadow rounded-lg px-10 py-5'
        onSubmit={handleSubmit}
      >
        {alert.msg && <Alert alert={alert} />}
        <div className='my-5'>
          <label
            className='uppercase text-gray-600 block font-bold'
            htmlFor='email'
          >
            Email
          </label>
          <input
            type='email'
            placeholder='Email'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <input
          type='submit'
          value='Send Email'
          className='bg-sky-700 py-3 mb-5 text-white w-full font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors'
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          to='/'
          className='block text-center my-5 text-slate-500 uppercase text-sm'
        >
          do you have an account? Log in
        </Link>
        <Link
          to='/register'
          className='block text-center my-5 text-slate-500 uppercase text-sm'
        >
          You do not have an account? Sign up
        </Link>
      </nav>
    </>
  );
};
