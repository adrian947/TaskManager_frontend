import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layout/AuthLayout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { NewPassword } from "./pages/NewPassword";
import { ConfirmAccount } from "./pages/ConfirmAccount";
import { AuthProvider } from "./context/authContext";
import { PrivateRoute } from "./layout/PrivateRoute";
import { Projects } from "./pages/Projects";
import { NewProject } from "./pages/NewProject";
import { ProjectProvider } from "./context/projectContext";
import { Project } from "./components/Project";
import EditProject from "./pages/EditProject";
import { TaskProvider } from "./context/taskContext";
import { NewCollaborator } from "./pages/NewCollaborator";
import { CollaboratorProvider } from "./context/collaboratorContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <TaskProvider>
            <CollaboratorProvider>
              <Routes>
                //! Public routes
                <Route path='/' element={<AuthLayout />}>
                  <Route index element={<Login />} />
                  <Route path='register' element={<Register />} />
                  <Route path='forgot-password' element={<ForgotPassword />} />
                  <Route path='new-password/:token' element={<NewPassword />} />
                  <Route path='confirm/:token' element={<ConfirmAccount />} />
                </Route>
                //! Private routes
                <Route path='/projects' element={<PrivateRoute />}>
                  <Route index element={<Projects />} />
                  <Route path='new-project' element={<NewProject />} />
                  <Route path=':id' element={<Project />} />
                  <Route path='edit/:id' element={<EditProject />} />
                  <Route
                    path='new-collaborator/:id'
                    element={<NewCollaborator />}
                  />
                </Route>
              </Routes>
            </CollaboratorProvider>
          </TaskProvider>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
