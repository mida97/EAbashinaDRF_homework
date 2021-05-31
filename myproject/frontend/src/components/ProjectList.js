import React from 'react'
import {Link} from 'react-router-dom'



const ProjectItem = ({project}) => {
   return (
       <tr>
           <td>
               {project.name}
           </td>
           <td>
               {project.status}
           </td>

           <td>
               {/* {project.projectId} */}
               <Link to={`projects/${project.projectId}`}>{project.projectId}</Link>
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
                <th>
                        ID
                </th>
                {projects.map((project) => <ProjectItem project={project} />)}
            </table>
        </div>
   )
}


export default ProjectList
