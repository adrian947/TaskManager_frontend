import React, { useState, useEffect } from "react";
import { Alert } from "./Alert";
import useTask from "./../hooks/useTask";
import { useParams } from "react-router-dom";
import useProject from "../hooks/useProject";
import { format } from "../helpers/formatdate";

export const FormTask = () => {
  const { submitForm, task, setTask, updateTask } = useTask();
  const { setModalFormTask } = useProject();
  const params = useParams();

  const [name, setName] = useState("");
  const [dateDelivery, setDateDelivery] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [alert, setAlert] = useState({});

  useEffect(() => {
    if (Object.entries(task).length) {
      setName(task.name);
      setDateDelivery(task.dateDelivery.substring(0, 10));
      setDescription(task.description);
      setPriority(task.priority);
    }

    return () => {
      setTask({});
    };
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, priority, dateDelivery].includes("")) {
      setAlert({
        msg: "All fields is required",
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 2000);
      return;
    }
    {
      Object.entries(task).length
        ? await updateTask({
            name,
            dateDelivery,
            description,
            priority,
            project: task._id,
          })
        : await submitForm({
            name,
            dateDelivery,
            description,
            priority,
            project: params.id,
          });
    }
    setModalFormTask(false);
  };

  return (
    <form className='my-10' onSubmit={handleSubmit}>
      {alert.msg && <Alert alert={alert} />}
      <div className='mb-5'>
        <label
          className='text-gray-700 uppercase font-bold text-sm'
          htmlFor='name'
        >
          Task
        </label>
        <input
          type='text'
          id='name'
          placeholder='Name task'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='mb-5'>
        <label
          className='text-gray-700 uppercase font-bold text-sm'
          htmlFor='date'
        >
          Date
        </label>
        <input
          type='date'
          id='date'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={dateDelivery}
          onChange={(e) => setDateDelivery(e.target.value)}
        />
      </div>
      <div className='mb-5'>
        <label
          className='text-gray-700 uppercase font-bold text-sm'
          htmlFor='description'
        >
          Description
        </label>
        <textarea
          type='text'
          id='description'
          placeholder='Description task'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ resize: "none" }}
        ></textarea>
        <select
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option disabled value=''>
            --Select Priority--
          </option>
          <option>low</option>
          <option>medium</option>
          <option>hight</option>
        </select>

        <input
          className='bg-sky-600 hover:bg-sky-700 hover:cursor-pointer font-bold w-full p-3 text-white uppercase rounded-md mt-5 text-center transition-colors'
          value={
            Object.entries(task).length ? "update task" : "Create new Task"
          }
          type='submit'
        />
      </div>
    </form>
  );
};
