import React, { useState } from "react";
import { Link } from "react-router-dom";
import clientAxios from "../axios/clientAxios";
import { Alert } from "../components/Alert";


export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, rPassword].includes("")) {
      setAlert({
        msg: "All fields are required",
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 2000);
      return;
    }

    if (password !== rPassword) {
      setAlert({
        msg: "error repeating password",
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 2000);
      return;
    }
    //!create user

    try {
      await clientAxios.post(`/user`, {
        name,
        password,
        email,
      });
      setAlert({
        msg: "User created successfully",
        error: false,
      });

      setName("");
      setEmail("");
      setPassword("");
      setRPassword("");
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

  const { msg } = alert;

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        create your account and manage your
        <span className='text-slate-700'> projects</span>{" "}
      </h1>
      {msg && <Alert alert={alert} />}
      <form
        className='my-10 bg-white shadow rounded-lg px-10 py-5'
        onSubmit={handleSubmit}
      >
        <div className='my-5'>
          <label
            className='uppercase text-gray-600 block font-bold'
            htmlFor='name'
          >
            Name
          </label>
          <input
            type='text'
            placeholder='Name'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='my-5'>
          <label
            className='uppercase text-gray-600 block font-bold'
            htmlFor='rpassword'
          >
            Repeat Password
          </label>
          <input
            type='password'
            placeholder='Repeat Password'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            id='rpassword'
            value={rPassword}
            onChange={(e) => setRPassword(e.target.value)}
          />
        </div>

        <input
          type='submit'
          value='Create Account'
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
          to='/forgot-password'
          className='block text-center my-5 text-slate-500 uppercase text-sm'
        >
          I forgot my password
        </Link>
      </nav>
    </>
  );
};
