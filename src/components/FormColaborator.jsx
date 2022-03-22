import React, { useState } from "react";
import { Alert } from "./Alert";
import clientAxios from "./../axios/clientAxios";
import { tokenAuth } from "../axios/authTokenHeaders";
import useCollaborator from "./../hooks/useCollaborator";
import { Spinner } from "./Spinner";
import { useAlert } from "../hooks/useAlert";

export const FormColaborator = () => {
  const { setCollaborator } = useCollaborator();
  const { alert, showAlert } = useAlert();

  const [email, setEmail] = useState("");
  const [spinner, setSpinner] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      showAlert("All fields is required", true);
      return;
    }

    try {
      setSpinner(true);
      const { data } = await clientAxios.post(
        "projects/collaborator",
        { email },
        tokenAuth()
      );

      setCollaborator(data);
    } catch (error) {
      showAlert(error.response.data.msg, true);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <>
      <form
        className='bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow'
        onSubmit={handleSubmit}
      >
        {alert.msg && <Alert alert={alert} />}
        <div className='mb-5'>
          <label
            className='text-gray-700 uppercase font-bold text-sm'
            htmlFor='email'
          >
            Email Collaborator
          </label>
          <input
            type='email'
            id='email'
            placeholder='User Email'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input
          className='bg-sky-600 hover:bg-sky-700 hover:cursor-pointer font-bold w-full p-3 text-white uppercase rounded-md mt-5 text-center transition-colors'
          value='Search Collaborator'
          type='submit'
        />
        {spinner && <Spinner />}
      </form>
    </>
  );
};
