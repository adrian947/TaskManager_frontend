import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { tokenAuth } from "../axios/authTokenHeaders";
import clientAxios from "../axios/clientAxios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./../hooks/useAlert";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { alert, showAlert } = useAlert();

  const [projects, setProjects] = useState([]);
  const [projectsAndTask, setProjectsAndTasks] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalFormTask, setModalFormTask] = useState(false);
  const [search, setSearch] = useState(false);

  //!get projects
  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await clientAxios.get("projects", tokenAuth());
        setProjects(data.projects);
      } catch (error) {
        showAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };

    getProjects();

    return () => {
      setProjectsAndTasks({});
    };
  }, [auth]);

  //!add new project see FormProject
  const submitProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await clientAxios.post("projects", project, tokenAuth());

      setProjects([...projects, data.body]);

      showAlert({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        navigate("/projects");
      }, 1000);
    } catch (error) {
      showAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  //! get project

  const getProject = async (id) => {
    setLoading(true);
    try {
      const { data } = await clientAxios.get(`projects/${id}`, tokenAuth());

      setProjectsAndTasks(data);
    } catch (error) {
      navigate("/projects");
      showAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
    setLoading(false);
  };

  //! update project

  const updateProject = async (id, values) => {
    try {
      const { data } = await clientAxios.put(
        `projects/${id}`,
        values,
        tokenAuth()
      );

      const update = projects.map((p) =>
        p._id === data.project._id ? data.project : p
      );
      setProjects(update);
      navigate("/projects");
    } catch (error) {
      showAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  //!delete project
  const deleteProject = async (id) => {
    try {
      await clientAxios.delete(`projects/${id}`, tokenAuth());

      const deleteProject = projects.filter((p) => p._id !== id);

      setProjects(deleteProject);
      setProjectsAndTasks({});

      navigate("/projects");
    } catch (error) {
      showAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  //! open or close modal task
  const handleModalTask = () => {
    setModalFormTask(!modalFormTask);
  };

  const handleSearch = () => {
    setSearch(!search);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        projectsAndTask,
        alert,
        loading,
        modalFormTask,
        search,
        submitProject,
        setProjects,
        setProjectsAndTasks,
        getProject,
        updateProject,
        deleteProject,
        handleModalTask,
        setModalFormTask,
        handleSearch,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
