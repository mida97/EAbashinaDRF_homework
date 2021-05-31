import React from 'react';
import './App.css';
import UserList from './components/User.js'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
// import axios from 'axios'
import ProjectList from './components/ProjectList.js'
//import ProjectDetail from './components/ProjectDetail.js'
import ToDoList from './components/ToDoList.js'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}


class App extends React.Component {

/*    constructor(props) {
       super(props)
       this.state = {
           'users': []
       }
   } */


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


/*    componentDidMount() {
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
 */


   render () {
       return (
            <div class='wrapper'>
                <BrowserRouter>
                    <div>
                        <Menu/>
                    </div>           
                    <div class='mycontent'>
                        <Switch>
                            <Route exact path='/users' component={() => <UserList users={this.state.users} />}  />
                            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />
                            <Route exact path='/todos' component={() => <ToDoList todos={this.state.todos} />} />
                            <Redirect from='/' to='/projects' />
                            <Route path="/projects/:id">
                            <ToDoList todos={this.state.todos} />
                            </Route>
                            <Route component={NotFound404} />     
                            
                        </Switch>     
                    </div>
                    <div>
                        <Footer/>  
                    </div>  
                </BrowserRouter>              
            </div>
       )
   }
}


export default App;
