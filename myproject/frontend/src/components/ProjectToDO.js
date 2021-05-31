import React from 'react'
import { useParams } from 'react-router-dom'

const ToDoItem = ({todo}) => {
   return (
       <tr>
           <td>
               {todo.name}
           </td>
           <td>
               {todo.project.name}
           </td>
       </tr>
   )
}


const ProjectToDoList = ({todos}) => {
    let { projectId } = useParams();
    let filtered_items = todos.filter((todo) => todo.project.projectId === projectId)
    return (
     <div>
         <h1>
             ToDoList
         </h1>
         <table>
             <th>
                     Name
             </th>
             <th>
                     Project {projectId}
             </th>
             {filtered_items.map((todo) =>  <ToDoItem todo={todo} />)}
         </table>
        </div>
    )
 }


export default ProjectToDoList