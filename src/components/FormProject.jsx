import React, { useEffect, useState } from "react";
import { Alert } from "./Alert";
import useProject from "../hooks/useProject";
import { useParams } from "react-router-dom";
import { useAlert } from "./../hooks/useAlert";

export const FormProject = () => {
  const { submitProject, projectsAndTask, setProjectsAndTasks, updateProject } =
    useProject();
  const { alert, showAlert } = useAlert();
  const params = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateDelivery, setDateDelivery] = useState("");
  const [client, setClient] = useState("");

  useEffect(() => {
    if (params.id) {
      if (Object.entries(projectsAndTask).length === 0) return null;
      setName(projectsAndTask.project.name);
      setDescription(projectsAndTask.project.description);
      setDateDelivery(projectsAndTask.project.dateDelivery.split("T")[0]);
      setClient(projectsAndTask.project.client);
    } else {
      setProjectsAndTasks({});
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if ([name, description, dateDelivery, client].includes("")) {
        showAlert({
          msg: "All fields is requiered",
          error: true,
        });

        return;
      }
      if (params.id) {
        await updateProject(params.id, {
          name,
          description,
          dateDelivery,
          client,
        });
        return;
      } else {
        await submitProject({ name, description, dateDelivery, client });
      }

      setName("");
      setDescription("");
      setDateDelivery("");
      setClient("");
    } catch (error) {
      showAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <form
      className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
      onSubmit={handleSubmit}
    >
      {alert.msg && <Alert alert={alert.msg} />}

      <div className='mb-5'>
        <label
          className='text-gray-400 uppercase font-bold text-sm'
          htmlFor='name'
        >
          Project name
        </label>
        <input
          type='text'
          id='name'
          className='w-full border-2 p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Project name'
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className='mb-5'>
        <label
          className='text-gray-400 uppercase font-bold text-sm'
          htmlFor='description'
        >
          Description
        </label>
        <textarea
          type='text'
          id='description'
          className='w-full border-2 p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Description'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          style={{ resize: "none" }}
        ></textarea>
      </div>
      <div className='mb-5'>
        <label
          className='text-gray-400 uppercase font-bold text-sm'
          htmlFor='dateDelivery'
        >
          Date Delivery
        </label>
        <input
          type='date'
          id='dateDelivery'
          className='w-full border-2 p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Date Delivery'
          onChange={(e) => setDateDelivery(e.target.value)}
          value={dateDelivery}
        />
      </div>
      <div className='mb-5'>
        <label
          className='text-gray-400 uppercase font-bold text-sm'
          htmlFor='client'
        >
          Client
        </label>
        <input
          type='text'
          id='client'
          className='w-full border-2 p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Client'
          onChange={(e) => setClient(e.target.value)}
          value={client}
        />
      </div>

      <input
        type='submit'
        value={params.id ? "update project" : "Create project"}
        className='bg-sky-600 text-white p-3 rounded-md w-full block font-bold uppercase hover:cursor-pointer hover:bg-sky-700 transition-colors'
      />
    </form>
  );
};
