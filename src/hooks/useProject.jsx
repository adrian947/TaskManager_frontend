import { useContext } from "react";
import { ProjectContext } from '../context/projectContext';

const useProject = () => {
  return useContext(ProjectContext);
};

export default useProject;
