import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clientAxios from "../axios/clientAxios";
import { Alert } from "./../components/Alert";
import useAuth from "./../hooks/useAuth";

export const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("a@a.com");
  const [password, setPassword] = useState("123123");
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await clientAxios.post("/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate('/projects')


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
        Log in and manage your<span className='text-slate-700'> projects</span>{" "}
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
        <div className='my-5'>
          <label
            className='uppercase text-gray-600 block font-bold'
            htmlFor='password'
          >
            Password
          </label>
          <input
            type='password'
            placeholder='Password'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <input
          type='submit'
          value='LOGIN'
          className='bg-sky-700 py-3 mb-5 text-white w-full font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors'
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          to='/register'
          className='block text-center my-5 text-slate-500 uppercase text-sm'
        >
          You do not have an account? Sign up
        </Link>
        <Link
          to='/forgot-password'
          className='block text-center my-5 text-slate-500 uppercase text-sm'
        >
          I forgot my password
        </Link>
      </nav>
    </>
  );
};
