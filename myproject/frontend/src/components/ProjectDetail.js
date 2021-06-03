import React from 'react'
import { useParams } from 'react-router-dom'


const ProjectDetail = ({projects}) => {

   let { projectId } = useParams();
   let project = projects.find((project) => project.projectId == projectId);


   return (
        <div>
         <form>
             <fieldset>
             <legend>Проект №{project.projectId}</legend>
                 Имя <input readOnly type="text" size="40" value={project.name} /> <br />
                 Статус <input readOnly type="text" size="40" value={project.status} /><br />
             </fieldset>
         </form>
        </div>
   )
}

export default ProjectDetail
