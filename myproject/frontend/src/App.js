import React from 'react';
import './App.css';
import UserList from './components/User.js'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
import axios from 'axios'
import ProjectList from './components/ProjectList.js'
import ProjectDetail from './components/ProjectDetail.js'
import ProjectCreateForm from './components/ProjectCreate.js'
import ProjectToDoList from './components/ProjectToDo.js'
import ToDoList from './components/ToDoList.js'
import ToDoCreateForm from './components/ToDoCreate.js'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/Auth.js'


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
       let token = localStorage.getItem('token');
       let username = localStorage.getItem('username');
       this.state = {
           'users': [],
           'projects': [],
           'todos': [],
           'token': token,
           'username':username
       }
   }

    restoreToken() {
        let token = localStorage.getItem('token');

        this.setState(
           {
               'token': token
           }, this.loadData
        );
    }

    getToken(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
           this.setState(
               {
                   'token': response.data.token,
                   'username': username
               }, this.loadData
               );
           localStorage.setItem('token', response.data.token);
           localStorage.setItem('username', username);
           console.log(this.state.token);
        }).catch(error => alert('Неверный логин или пароль'))
    }

    isAuth() {
        return (this.state.token != null && this.state.token != '')
    }

    logout() {
       console.log("logout")
       this.setState(
           {
                'users': [],
                'projects': [],
                'todos': [],
                'token': '',
                'username':''
           }
       );
       localStorage.setItem('token', '');
       localStorage.setItem('username', '');
    }

    createHeader() {
       if (!this.isAuth())
           return {};

       return {
            'Authorization': 'Token ' + this.state.token
       }
    }

    deleteTodo(id){
        console.log('deleteTodo'+id)
        let headers = this.createHeader();
        axios
        .delete(`http://127.0.0.1:8000/api/todo/${id}/`, {headers})
        .then(response => {
            this.loadData()
        })
        .catch(error => {console.log(error)})
    }

    deleteProject(id){
        let headers = this.createHeader();
        axios
        .delete(`http://127.0.0.1:8000/api/projects/${id}/`, {headers})
        .then(response => {
            this.loadData()
        })
        .catch(error => {console.log(error)})
    }


    createProject(name, repoLink, members) {
        console.log("create_project " + name + " - " + repoLink);
        console.log(members);
        let headers = this.createHeader();
        axios
        .post(
                'http://127.0.0.1:8000/api/projects/',
                {"name": name, "repoLink": repoLink, "projectMembers": members},
                {headers}
        )
        .then(response => {
                this.loadData()
        })
        .catch(error => {console.log(error)})
    }

    saveProject(projectId, name, repoLink, status, members) {
        console.log("save_project " + name);
        console.log(members);
        let headers = this.createHeader();
        axios
        .patch(
                `http://127.0.0.1:8000/api/projects/${projectId}/`,
                {"projectId": projectId,
                "name": name,
                "status": status,
                "repoLink": repoLink,
                "projectMembers": members
                },
                {headers}
        )
        .then(response => {
                this.loadData()
        })
        .catch(error => {console.log(error)})
    }


    createToDo(description, projectId, planDate, assignedTo) {
        console.log("createTodo " + description + " - " + projectId + " - " + planDate + " - " + assignedTo);

        let headers = this.createHeader();
        axios
        .post(
                'http://127.0.0.1:8000/api/todo/',
                {"description": description,
                "planDate": planDate,
                "project": projectId,
                "assignedTo":assignedTo,
                "isDone":false},
                {headers}
        )
        .then(response => {
                this.loadData()
        })
        .catch(error => {console.log(error)})
    }

    loadData() {
        let headers = this.createHeader();
        console.log(headers)
        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
            const users = response.data.results
                this.setState({
                    'users':users
                })
            }).catch(error => console.log(error));
        axios.get('http://127.0.0.1:8000/api/projects', {headers})
        .then(response => {
            const projects = response.data.results
                this.setState({
                    'projects':projects
                })
        }).catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/todo', {headers})
        .then(response => {
            const todos = response.data.results
                this.setState({
                    'todos':todos
                })
        }).catch(error => console.log(error));

    }

    componentDidMount(){
        this.restoreToken();

    }


   render () {
       return (
            <div class='wrapper'>
                <BrowserRouter>
                    <div>
                        <Menu is_auth={() => this.isAuth()}
                        logout={() => this.logout()}
                        username={this.state.username}/>
                    </div>           
                    <div>
                        <Switch>
                            <Route exact path='/users' component={() => <UserList users={this.state.users} />} />
                            <Route exact path='/todos' component={() => <ToDoList todos={this.state.todos} deleteTodo = {(id) => this.deleteTodo(id)} />} />
                            <Route exact path='/' component={() => <ProjectList projects={this.state.projects} deleteProject = {(id) => this.deleteProject(id)}/>}/>
                            <Route exact path='/project/id:projectId'>
                              <ProjectDetail projects={this.state.projects} users={this.state.users}
                              saveProject = {(projectId, name, repoLink, status, members) => this.saveProject(projectId, name, repoLink, status, members)} />
                              <ProjectToDoList todos={this.state.todos}/>
                            </Route>
                            <Route exact path='/project/create'  
                            component = {() => <ProjectCreateForm createProject = {(name, repoLink, members) => this.createProject(name, repoLink, members)} 
                            users={this.state.users} />} />
                            <Route exact path='/todo/create:projectId'
                            component = {() => <ToDoCreateForm users={this.state.users} projects={this.state.projects}
                            createToDo = {(description, projectId, planDate, assignedTo) => this.createToDo(description, projectId, planDate, assignedTo)}/>} />
                            <Route exact path='/login' component = {() => <LoginForm get_token={(username, password) => this.getToken(username, password)}/>} />

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
