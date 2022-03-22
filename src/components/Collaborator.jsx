import React, { useRef } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import clientAxios from "./../axios/clientAxios";
import { tokenAuth } from "./../axios/authTokenHeaders";
import { useParams } from "react-router-dom";
import { useAlert } from "./../hooks/useAlert";
import { Alert } from "./Alert";
import useProject from "../hooks/useProject";

export const Collaborator = ({ col }) => {
  const ref = useRef();
  const params = useParams();
  const { alert, showAlert } = useAlert();
  const { projectsAndTask, setProjectsAndTasks } = useProject();
  const { project } = projectsAndTask;

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "The collaborator has been deleted.", "success");
        try {
          const { data } = await clientAxios.post(
            `projects/delete-collaborator/${params.id}`,
            { id },
            tokenAuth()
          );

          const updateProject = { ...project };
          updateProject.collaborators = updateProject.collaborators.filter(
            (col) => col._id !== id
          );

          setProjectsAndTasks({ project: updateProject });
        } catch (error) {
          console.log("error", error);
          showAlert({
            msg: error.response.data.msg,
            error: true,
          });
        }
      }
    });
  };

  return (
    <div className='border-b p-5 flex justify-between items-center'>
      {alert.msg && <Alert alert={alert} />}
      <div>
        <p>{col.name}</p>
        <p className='text-gray-400'>{col.email}</p>
      </div>
      <div>
        <button
          className='bg-red-600 px-4 py-3 text-white uppercase rounded-lg font-bold text-sm'
          onClick={() => handleDelete(ref.current.id)}
          ref={ref}
          id={col._id}
        >
          Detele Collaborator
        </button>
      </div>
    </div>
  );
};
