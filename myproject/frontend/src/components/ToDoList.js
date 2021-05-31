import React from 'react'


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
            {todos.map((todo) => <ToDoItem todo={todo} />)}
        </table>
       </div>
   )
}


export default ToDoList