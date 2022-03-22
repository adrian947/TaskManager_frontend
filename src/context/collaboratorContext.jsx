import { createContext, useState } from "react";
import clientAxios from "./../axios/clientAxios";
import { tokenAuth } from "./../axios/authTokenHeaders";
import { useAlert } from "./../hooks/useAlert";

export const CollaboratorContext = createContext();

export const CollaboratorProvider = ({ children }) => {
  const [collaborator, setCollaborator] = useState({});
  const { alert, showAlert } = useAlert();

  const addCollaborator = async (email, id) => {
    try {
      const { data } = await clientAxios.post(
        `projects/collaborator/${id}`,
        email,
        tokenAuth()
      );
      showAlert(data.msg, false);
    } catch (error) {
      showAlert(error.response.data.msg, true);
    } finally {
      setTimeout(() => {
        setCollaborator({});
      }, 2000);
    }
  };

  return (
    <CollaboratorContext.Provider
      value={{ collaborator, alert, setCollaborator, addCollaborator }}
    >
      {children}
    </CollaboratorContext.Provider>
  );
};
