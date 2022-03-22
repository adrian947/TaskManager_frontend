import React, { useEffect } from "react";
import { FormColaborator } from "../components/FormColaborator";
import useProject from "./../hooks/useProject";
import { useParams } from "react-router-dom";
import useCollaborator from "./../hooks/useCollaborator";
import { Alert } from './../components/Alert';

export const NewCollaborator = () => {
  const { getProject, projectsAndTask } = useProject();
  const { collaborator, addCollaborator, alert } = useCollaborator();
  const { id } = useParams();

  useEffect(() => {
    getProject(id);
  }, []);

  const handleClick = () => {
    addCollaborator({ email: collaborator.email }, projectsAndTask.project._id);
  };

  if (Object.entries(projectsAndTask).length === 0) return null;

  return (
    <>
      <h1 className='text-4xl font-black'>
        Add Collaborator: {projectsAndTask.project.name}{" "}
      </h1>

      <div className='mt-10 flex justify-center'>
        <FormColaborator />
      </div>
      {collaborator.email && (
        <div className='flex justify-center mt-10'>
          <div className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'>
          {alert.msg && <Alert alert={alert} />}
            <h2 className='text-center mb-5 text-2xl font-bold'>
              {collaborator.name}
            </h2>
            <button
              type='button'
              className='bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold- text-sm w-full'
              onClick={handleClick}
            >
              Add to project
            </button>
          </div>
        </div>
      )}
    </>
  );
};
