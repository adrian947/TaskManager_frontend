import React from "react";
import { FormProject } from "../components/FormProject";

export const NewProject = () => {
  return (
    <>
      <h1 className='text-4xl font-black text-center'>New Projects</h1>
      <div className='mt-10 flex justify-center'>
        <FormProject />
      </div>
    </>
  );
};
