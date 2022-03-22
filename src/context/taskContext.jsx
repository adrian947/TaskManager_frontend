import { createContext, useState, useEffect } from "react";
import clientAxios from "./../axios/clientAxios";
import { tokenAuth } from "./../axios/authTokenHeaders";
import useProject from "../hooks/useProject";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [task, setTask] = useState({});

  const { projectsAndTask, setProjectsAndTasks } = useProject();

  //!new task
  const submitForm = async (values) => {
    const { data } = await clientAxios.post("/task", values, tokenAuth());

    const project = { ...projectsAndTask };
    project.project.task = [...projectsAndTask.project.task, data.task];

    setProjectsAndTasks(project);
  };

  //! update task
  const updateTask = async (values) => {
    const { data } = await clientAxios.put(
      `/task/${values.project}`,
      values,
      tokenAuth()
    );
    const updateProject = { ...projectsAndTask };
    updateProject.project.task = updateProject.project.task.map((taskState) =>
      taskState._id === data._id ? data : taskState
    );
    setProjectsAndTasks(updateProject);
  };

  //! delete task

  const deleteTask = async (id) => {
    const { data } = await clientAxios.delete(`/task/${id}`, tokenAuth());

    const updateProject = { ...projectsAndTask };
    updateProject.project.task = updateProject.project.task.filter(
      (taskState) => taskState._id !== id
    );

    setProjectsAndTasks(updateProject);
  };

  //!change State task

  const changeStateTask = async (id) => {
    try {
      const { data } = await clientAxios.put(
        `/task/state/${id}`,
        {},
        tokenAuth()
      );

      const updateProject = { ...projectsAndTask };
      updateProject.project.task = updateProject.project.task.map((taskState) =>
        taskState._id === data._id ? data : taskState
      );

      setProjectsAndTasks(updateProject);
    } catch (error) {
      console.log("error", error);
    }
  };



  return (
    <TaskContext.Provider
      value={{
        task,
        submitForm,
        setTask,
        updateTask,
        deleteTask,
        changeStateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
