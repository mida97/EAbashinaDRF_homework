import React from 'react'
import {Link} from 'react-router-dom'


const ToDoItem = ({todo, deleteTodo}) => {
   return (
       <tr>
           <td>
               {todo.todoId}
           </td>
           <td>
               <Link to={`/project/id${todo.project}`}>{todo.project}</Link>
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
           <td>
                <button onClick={()=> deleteTodo(todo.todoId)}>Close</button>
           </td>
       </tr>
   )
}


const ToDoList = ({todos, deleteTodo}) => {
   return (
    <div>
        <h1>
            ToDoList
        </h1>
        <Link to={`/todo/createnew`}>Create ToDo</Link>
        <table>
            <th>
                    #
            </th>
            <th>
                    Project
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
            <th/>
            {todos.map((todo) => <ToDoItem todo={todo} deleteTodo={deleteTodo}/>)}
        </table>
       </div>
   )
}


export default ToDoList