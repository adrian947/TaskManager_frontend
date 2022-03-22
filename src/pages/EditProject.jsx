import React, { useEffect } from "react";
import useProject from "./../hooks/useProject";
import { useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { FormProject } from './../components/FormProject';

const EditProject = () => {
  const { getProject, projectsAndTask, loading } = useProject();

  const params = useParams();

  useEffect(() => {
    getProject(params.id);
  }, []);

  if (Object.entries(projectsAndTask).length === 0) return null;

  const { name } = projectsAndTask.project;

  if (loading) return <Spinner />;

  return (
    <div>
      <h1 className='font-black text-4xl uppercase text-center'>
        Edit project: <span className='text-4xl text-gray-600'> {name}</span>
      </h1>
      <div className='mt-10 flex justify-center'>
        <FormProject />
      </div>
    </div>
  );
};

export default EditProject;
