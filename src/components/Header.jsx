import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "./../hooks/useAuth";
import useProject from "../hooks/useProject";
import Search from './Search';

export const Header = () => {
  const { setAuth } = useAuth();
  const { setProjects, handleSearch } = useProject();

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setAuth({});
    setProjects([]);
    navigate("/");
  };

  return (
    <header className='px-4 py-5 bg-white border-b'>
      <div className='md:flex  md:justify-between'>
        <h2 className='text-4xl text-sky-600 font-black text-center mb-5 md:mb-0'>
          Project Manager
        </h2>
        <div className='flex flex-col md:flex-row items-center gap-4'>
          <button type='button' className='font-bold uppercase' onClick={()=>handleSearch()}>
            Search Project
          </button>
          <Link to='/projects' className='font-bold uppercase'>
            Projects
          </Link>
          <button
            type='button'
            className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'
            onClick={handleLogOut}
          >
            Log out
          </button>
          <Search />
        </div>
      </div>
    </header>
  );
};
