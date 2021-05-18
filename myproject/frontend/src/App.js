import React from 'react';
import './App.css';
import UserList from './components/User.js'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
import axios from 'axios'


class App extends React.Component {

   constructor(props) {
       super(props)
       this.state = {
           'users': []
       }
   }


   componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users')
        .then(response => {
            const users = response.data
                this.setState(
                {
                    'users': users
                }
            )
        }).catch(error => console.log(error))
    }


   render () {
       return (
            <div class='wrapper'>
                <div>
                    <Menu/>
                </div>           
                <div class='mycontent'>
                    <UserList users={this.state.users} />
                </div>
                <div>
                    <Footer/>  
                </div>              
            </div>
       )
   }
}


export default App;
