import { useContext } from "react";
import { CollaboratorContext } from "../context/collaboratorContext";

const useCollaborator = () => {
  return useContext(CollaboratorContext);
};

export default useCollaborator;
