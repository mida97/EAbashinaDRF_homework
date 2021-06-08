import React from 'react'
import {Link} from 'react-router-dom'



const ProjectItem = ({project}) => {
   return (
       <tr>
           <td>
               <Link to={`/project/${project.projectId}`}>{project.projectId}</Link>
           </td>
           <td>
               {project.status}
           </td>
       </tr>
   )
}


const ProjectList = ({projects}) => {
   return (
        <div>
            <h1>
                ProjectList
            </h1>
            <table>
                <th>
                        Name
                </th>
                <th>
                        Status
                </th>

                {projects.map((project) => <ProjectItem project={project} />)}
            </table>
        </div>
   )
}


export default ProjectList
