import React, { useRef, useState } from "react";
import { format } from "../helpers/formatdate";
import useProject from "./../hooks/useProject";
import useTask from "./../hooks/useTask";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import useAdmin from "./../hooks/useAdmin";

export const Task = ({ task }) => {
  const { setTask, deleteTask, changeStateTask } = useTask();
  const admin = useAdmin();
  const ref = useRef();
  const { setModalFormTask } = useProject();

  

  const { _id, name, description, dateDelivery, priority, state, complete } =
    task;

  const handleClick = () => {
    setModalFormTask(true);
    setTask(task);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Task has been deleted.", "success");
        deleteTask(ref.current.id);
      }
    });
  };

  const handleClickState = (id)=>{
    changeStateTask(id)

  }



  return (
    <>
      <div className='border-b p-5 flex justify-between items-center gap-2'>
        <div className=''>
          <p className='text-xl mb-1'>Name: {name}</p>
          <p className='text-s mb-1'>Description: {description}</p>
          <p className='text-s mb-1'>
            DateDelivery: {format(dateDelivery.slice(0, 10))}
          </p>
          <p className='text-gray-600 mb-1'>Priority: {priority}</p>
     {state && <p className='text-white mb-1 bg-green-600 rounded-lg p-1'>Complete by: {complete.name}</p>}
        </div>
        <div className='flex flex-col lg:flex-row gap-4'>
          {admin && (
            <button
              id={_id}
              className='bg-indigo-600 px-4 py-3 text-white uppercase rounded-lg font-bold text-sm'
              onClick={handleClick}
            >
              Update
            </button>
          )}

          {state ? (
            <button className='bg-sky-600 px-4 py-3 text-white uppercase rounded-lg font-bold text-sm' onClick={()=>handleClickState(_id)}>
              Complete
            </button>
          ) : (
            <button className='bg-gray-600 px-4 py-3 text-white uppercase rounded-lg font-bold text-sm' onClick={()=>handleClickState(_id)}>
              incomplete
            </button>
          )}
          {admin && (
            <button
              className='bg-red-600 px-4 py-3 text-white uppercase rounded-lg font-bold text-sm'
              onClick={handleDelete}
              ref={ref}
              id={_id}
            >
              Detele
            </button>
          )}
        </div>
      </div>
    </>
  );
};
