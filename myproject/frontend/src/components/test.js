import React from 'react'
import { useParams } from 'react-router-dom'


/*
   constructor(props) {
    super(props)
    const user1 = {email: 1, username: 'Грин', firstName: 'Александр', lastName: 'Грин'}
    const user2 = {email: 2, username: 'Пушкин', firstName: 'Александр', lastName: 'Пушкин'}
    const users = [user1, user2]
    const project1 = {projectId: 1, name: 'Алые паруса', status: 'Draft'}
    const project2 = {projectId: 2, name: 'Золотая цепь', status: 'Draft'}
    const projects = [project1, project2,]
    const todo1 = {todoId: 1, name: 'Пиковая дама', project: project1}
    const todo2 = {todoId: 2, name: 'Руслан', project: project2}
    const todo3 = {todoId: 3, name: 'Людмила', project: project2}
    const todos = [todo1, todo2, todo3]
    this.state = {
      'users': users,
      'projects': projects,
      'todos': todos
    }
  }

*/



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
