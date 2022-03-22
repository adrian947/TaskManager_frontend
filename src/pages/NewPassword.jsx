import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clientAxios from "../axios/clientAxios";
import { Alert } from "../components/Alert";

export const NewPassword = () => {
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const validateToken = async () => {
      try {
        await clientAxios.get(`/user/forgot-password/${token}`);

        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    validateToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: "Password must be longer than 6 characters",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clientAxios.post(
        `/user/forgot-password/${token}`,
        { password }
      );
      setAlert({
        msg: data.msg,
        error: false,
      });
      setPassConfirm(true);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        confirm your password and get a
        <span className='text-slate-700'> new access</span>{" "}
      </h1>
      {validToken ? (
        <form
          className='my-10 bg-white shadow rounded-lg px-10 py-5'
          onSubmit={handleSubmit}
        >
          {alert.msg && <Alert alert={alert} />}
          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block font-bold'
              htmlFor='password'
            >
              New Password
            </label>
            <input
              type='password'
              placeholder='NewPassword'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <input
            type='submit'
            value='Create Account'
            className='bg-sky-700 py-3 mb-5 text-white w-full font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors'
          />
        </form>
      ) : (
        <Alert alert={alert} />
      )}
      {passConfirm && (
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
