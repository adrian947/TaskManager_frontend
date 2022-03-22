import React, { useEffect } from "react";
import PreviewProject from "../components/PreviewProject";
import useProject from "./../hooks/useProject";

export const Projects = () => {
  const { projects } = useProject();

  return (
    <>
      <h1 className='text-4xl font-black'>Projects</h1>
      <div className='bg-white shadow mt-10 rounded-lg p-5'>
        {projects.length ? (
          projects.map((p) => <PreviewProject projects={p} key={p._id} />)
        ) : (
          <p className='mt-5 text-center text-gray-600 uppercase'>
            there aren't projects
          </p>
        )}
      </div>
    </>
  );
};
