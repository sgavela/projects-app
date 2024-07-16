import ProjectForm from "./ProjectForm";
import { Project } from "./Project";
import { projectAPI } from "./ProjectAPI";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useState } from "react";

function NewProjectPage(props: any) {
  const navigate = useNavigate();
  const goToProjects = () => {
    navigate("/projects");
  };
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const saveProject = (project: Project) => {
    projectAPI
      .post(project)
      .then(setSuccess)
      .catch((e: Error) => {
        if (e instanceof Error) {
          setError(e.message)
        }
      })
  };
  return (
    <div>
      <>
        <h1>Complete new project details</h1>
        {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
        )}
        {success && (
        <div className="row">
          <div className="card large green-background">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                Project created successfuly.
              </p>
            </section>
          </div>
        </div>
        )}
        <ProjectForm 
          project={new Project()} 
          onCancel={goToProjects}
          onSave={saveProject}
        />
      </>
    </div>
  );
}

export default NewProjectPage;