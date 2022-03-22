import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clientAxios from "../axios/clientAxios";
import { Alert } from "../components/Alert";

export const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [accountConfirm, setAccountConfirm] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `user/confirm/${token}`;
        const { data } = await clientAxios.get(url);

        setAlert({
          msg: data.msg,
          error: false,
        });

        setAccountConfirm(true);
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
    confirmAccount();
  }, []);

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        confirm account and start creating your
        <span className='text-slate-700'> projects</span>{" "}
      </h1>
      {alert.msg && <Alert alert={alert} />}

      {accountConfirm && (
        <Link
          to='/'
          className='block text-center my-5 text-slate-500 uppercase text-sm'
        >
          Log in
        </Link>
      )}
    </>
  );
};
