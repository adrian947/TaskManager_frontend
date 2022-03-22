import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useProject from "../hooks/useProject";
import { Spinner } from "./Spinner";
import { ModalTask } from "./ModalTask";
import { Task } from "./Task";
import { Collaborator } from "./Collaborator";
import useAdmin from "./../hooks/useAdmin";
import { Alert } from "./Alert";

export const Project = () => {
  const {
    getProject,
    projectsAndTask,
    loading,
    deleteProject,
    handleModalTask,
    alert,
  } = useProject();

  const params = useParams();

  useEffect(() => {
    getProject(params.id);
  }, []);

  const admin = useAdmin();
  if (Object.entries(projectsAndTask).length === 0) return null;

  const { name } = projectsAndTask.project;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className='flex items-center'>
            <h1 className='font-black text-4xl uppercase'>{name}</h1>
            <Link to={`/projects/edit/${params.id}`}>
              <i className='fa-solid fa-pen text-2xl ml-3 text-indigo-600'></i>
            </Link>
            <i
              className='fa-solid fa-trash text-2xl ml-3 hover:cursor-pointer text-red-600'
              onClick={() => deleteProject(params.id)}
            ></i>
          </div>
          {alert.msg && <Alert alert={alert.msg} />}

          {admin && (
            <button
              type='button'
              className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 mt-5 text-white flex items-center'
              onClick={() => handleModalTask()}
            >
              <i className='fa-solid fa-circle-plus text-xl mr-2'></i> new Task
            </button>
          )}

          <p className='font-bold text-xl mt-10'>Task</p>
          <div className='bg-white shadow mt-10 rounded-lg'>
            {projectsAndTask.project.task?.length ? (
              projectsAndTask.project.task?.map((task) => (
                <Task key={task._id} task={task} />
              ))
            ) : (
              <p className='text-center p-10 my-5'>there aren´t project</p>
            )}
          </div>
          {admin ? (
            <>
              <div className='flex items-center justify-between mt-10'>
                <p className='font-bold text-xl'>Collaborators</p>
                <Link
                  to={`/projects/new-collaborator/${projectsAndTask.project._id}`}
                  className='text-gray-400 uppercase font-bold hover:text-black'
                >
                  Add Collaborators
                </Link>
              </div>

              <div className='bg-white shadow mt-10 rounded-lg'>
                {projectsAndTask.project.collaborators?.length ? (
                  projectsAndTask.project.collaborators?.map((col) => (
                    <Collaborator key={col._id} col={col} />
                  ))
                ) : (
                  <p className='text-center p-10 my-5'>
                    there aren´t collaborators
                  </p>
                )}
              </div>
            </>
          ) : null}

          <ModalTask />
        </>
      )}
    </>
  );
};
