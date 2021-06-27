import React from 'react'
import { useParams, Link} from 'react-router-dom'

const ToDoItem = ({todo}) => {
   return (
       <tr>
           <td>
               {todo.todoId}
           </td>
           <td>
               {todo.description}
           </td>
           <td>
               {todo.planDate}
           </td>
           <td>
                <input type="checkbox" checked={todo.isDone}/>
           </td>
       </tr>
   )
}


const ProjectToDoList = ({todos}) => {
    let { projectId } = useParams();
    let filtered_items = todos.filter((todo) => todo.project == projectId);
    return (
     <div>
        <h1>
            ToDoList
        </h1>
        <Link to={`/todo/create${projectId}`}>Create ToDo</Link>
         <table>
            <th>
                    #
            </th>
            <th>
                    Name
            </th>

            <th>
                    Plan date
            </th>
            <th>
                    Is Done
            </th>
             {filtered_items.map((todo) =>  <ToDoItem todo={todo} />)}
         </table>
        </div>
    )
 }


export default ProjectToDoList
