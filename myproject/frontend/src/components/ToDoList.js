import React from 'react'
import {Link} from 'react-router-dom'


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
               <Link to={`/project/${todo.project}`}>{todo.project}</Link>
           </td>
           <td>
               {todo.planDate}
           </td>
       </tr>
   )
}


const ToDoList = ({todos}) => {
   return (
    <div>
        <h1>
            ToDoList
        </h1>
        <table>
            <th>
                    #
            </th>
            <th>
                    Name
            </th>
            <th>
                    Project
            </th>
            <th>
                    Plan date
            </th>
            {todos.map((todo) => <ToDoItem todo={todo} />)}
        </table>
       </div>
   )
}


export default ToDoList