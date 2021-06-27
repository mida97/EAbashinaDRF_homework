import React from 'react'
import {Link} from 'react-router-dom'



const ProjectItem = ({project, deleteProject}) => {
   return (
       <tr>
           <td>
               <Link to={`/project/id${project.projectId}`}>{project.projectId}</Link>
           </td>
           <td>
               {project.name}
           </td>
           <td>
               {project.status}
           </td>
           <td>
               <button onClick={()=> deleteProject(project.projectId)}>Delete</button>
           </td>
       </tr>
   )
}


const ProjectList = ({projects, deleteProject}) => {
   return (
        <div>
            <h1>
                ProjectList
            </h1>
            <Link to={`/project/create`}>Create Project</Link>
            <table>
                <th>
                        #
                </th>
                <th>
                        Name
                </th>
                <th>
                        Status
                </th>
                <th/>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
            </table>
        </div>
   )
}


export default ProjectList
