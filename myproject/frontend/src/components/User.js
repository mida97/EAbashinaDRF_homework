import React from 'react'


const UserItem = ({user}) => {
   return (
       <tr>
           <td>
               {user.username}
           </td>
           <td>
               {user.email}
           </td>
           <td>
               {user.firstName}
           </td>
           <td>
               {user.lastName}
           </td>
       </tr>
   )
}


const UserList = ({users}) => {
   return (
       <table>
           <th>
               Login
           </th>
           <th>
               E-mail
           </th>
           <th>
               First name
           </th>
           <th>
               Last Name
           </th>
           {users.map((user) => <UserItem user={user} />)}
       </table>
   )
}


export default UserList