import { useContext } from "react";
import { TaskContext } from "../context/taskContext";

const useTask = () => {
  return useContext(TaskContext);
};

export default useTask;
