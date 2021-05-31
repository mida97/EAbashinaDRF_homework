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
{/*            <td>
               {todo.changeDate}
           </td> */}
       </tr>
   )
}


const ToDoList = ({todos}) => {
    let { id } = useParams();
    let filtered_items = todos.filter((todo) => todo.project.projectId == id)
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
                     Project
             </th>
     {/*            <th>
                     Change date
             </th> */}
             {filtered_items.map((todo) =>  <ToDoItem todo={todo} />)}

         </table>
        </div>
    )
 }


 
const ProjectDetail = ({project}) => {
    return (
     <form>
         <fieldset>
         <legend>Проект №{project.projectId}</legend>
             <input type="text" size="40" value={project.name}/> <br />
             <input type="text" size="40" value={project.status}/><br />
             <input type="text" size="40" value={project.name}/> <br />
         </fieldset>

     </form> 
  
    )
 }


export default ProjectDetail
