import React from "react";
import { Link } from "react-router-dom";
import useAuth from "./../hooks/useAuth";

const PreviewProject = ({ projects }) => {
  const { auth } = useAuth();

  const { name, _id, client, author } = projects;

  return (
    <div className='border-b p-3 flex flex-col md:flex-row items-center'>
      <p className='flex-1 uppercase'>
        {name}
        <span className='ml-2 text-sm text-gray-500 uppercase'>{client}</span>
      </p>

      {author !== auth._id && (
        <p className='text-indigo-600 hover:text-gray800 uppercase text-sm font-bold mr-4'>
          Collaborator
        </p>
      )}

      <Link
        to={`${_id}`}
        className='text-gray-600 hover:text-gray800 uppercase text-sm font-bold'
      >
        See Project
      </Link>
    </div>
  );
};

export default PreviewProject;
