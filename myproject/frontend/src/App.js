import React from 'react';
import './App.css';
import UserList from './components/User.js'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
import axios from 'axios'
import ProjectList from './components/ProjectList.js'
import ProjectDetail from './components/ProjectDetail.js'
import ProjectToDoList from './components/ProjectToDo.js'
import ToDoList from './components/ToDoList.js'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}


class App extends React.Component {

    constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'projects': [],
           'todos': []
       }
   }

    componentDidMount() {

        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                let s=this.state
                s.users=response.data.results
                this.setState(s)
            }).catch(error => console.log(error));
        axios.get('http://127.0.0.1:8000/api/projects')
        .then(response => {
                let s=this.state
                s.projects=response.data.results
                this.setState(s)
        }).catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/todo')
        .then(response => {
                let s=this.state
                s.todos=response.data.results
                this.setState(s)
        }).catch(error => console.log(error));

    }


   render () {
       return (
            <div class='wrapper'>
                <BrowserRouter>
                    <div>
                        <Menu/>
                    </div>           
                    <div>
                        <Switch>
                            <Route exact path='/users' component={() => <UserList users={this.state.users} />} />
                            <Route exact path='/todos' component={() => <ToDoList todos={this.state.todos} />} />
                            <Route exact path='/' component={() => <ProjectList projects={this.state.projects} />}/>
                            <Route exact path='/project/:projectId'>
                              <ProjectDetail projects={this.state.projects} />
                              <ProjectToDoList todos={this.state.todos}/>
                            </Route>
                            <Redirect from='/projects' to='/' />
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
