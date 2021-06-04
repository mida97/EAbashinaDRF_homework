import React from 'react'
import { useParams } from 'react-router-dom'

const ToDoItem = ({todo}) => {
   return (
       <tr>
           <td>
               {todo.description}
           </td>
           <td>
               {todo.planDate}
           </td>
       </tr>
   )
}


const ProjectToDoList = ({todos}) => {
    let { projectId } = useParams();
    let filtered_items = todos.filter((todo) => todo.project == projectId);
    return (
     <div>
        <a> Список задач</a>
         <table>
             <th>
                     Name
             </th>
             <th>
                     Plan date
             </th>
             {filtered_items.map((todo) =>  <ToDoItem todo={todo} />)}
         </table>
        </div>
    )
 }


export default ProjectToDoList