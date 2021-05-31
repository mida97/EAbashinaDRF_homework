import React from 'react'
import { useParams } from 'react-router-dom'


/*
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


const ToDoList = ({todos}) => {
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
                     Project
             </th>
             {filtered_items.map((todo) =>  <ToDoItem todo={todo} />)}

         </table>
        </div>
    )
 }
*/
/*

const ProjectDetail = ({projects}) => {
    let { projectId } = useParams();
//    let author = authors.find((author) => author.id == id);
    let project = projects.find((project) => project.projectId == projectId);
    return (
    <div>
     <form>
         <fieldset>
         <legend>Проект №{project.projectId}</legend>
             <input type="text" size="40" value={project.name}/> <br />
             <input type="text" size="40" value={project.status}/><br />
             <input type="text" size="40" value={project.name}/> <br />
         </fieldset>

     </form>
{      {project.map((todos) =>  <ToDoList todos={todos} />)} }
    </div>
    )
 }
 */
const ProjectDetail = ({projects}) => {

   let { projectId } = useParams();
   let project = projects.find((project) => project.projectId == projectId);

   return (
       <div>
               {project.name}
       </div>
   )
}

export default ProjectDetail
