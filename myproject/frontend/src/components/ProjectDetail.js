import React from 'react'
import { useParams } from 'react-router-dom'


const ProjectDetail = ({projects}) => {

   let { ProjectId } = useParams();
   console.log(ProjectId)
   let project = projects.find((project) => project.ProjectId == ProjectId);

   return (
        <div>
         <form>
             <fieldset>
             <legend>Проект №{project.projectId}</legend>
                 <input type="text" size="40" value={project.name}/> <br />
                 <input type="text" size="40" value={project.status}/><br />
             </fieldset>
         </form>
        </div>
   )
}

export default ProjectDetail
