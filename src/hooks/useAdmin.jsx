import useProject from "./useProject";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { projectsAndTask } = useProject();
  const { auth } = useAuth();

  return projectsAndTask.project?.author === auth._id;
};

export default useAdmin;
