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

    restore_token() {
        let token = localStorage.getItem('token');
//       console.log(           {
//               'token': token
//           }
//        );
        this.setState(
           {
               'token': token
           }
        );
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
           this.setState(
               {
                   'token': response.data.token,
                   'username': username
               });
           localStorage.setItem('token', response.data.token);
           localStorage.setItem('username', username);
           console.log(this.state.token);
        }).catch(error => alert('Неверный логин или пароль'))
    }

    is_auth() {
        return this.state.token != '';
    }

    logout() {
       console.log("logout")
       this.setState(
           {
               'token': '',
               'username':''
           }
       );
       localStorage.setItem('token', '');
       localStorage.setItem('username', '');

    }

    create_header() {
       if (!this.is_auth())
           return {};

       return {
            'Authorization': 'Token ' + this.state.token
       }
    }

    loadData() {
        let headers = this.create_header();
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
        this.restore_token();
        this.loadData()
    }


   render () {
       return (
            <div class='wrapper'>
                <BrowserRouter>
                    <div>
                        <Menu is_auth={() => this.is_auth()}
                        logout={() => this.logout()}
                        username={this.state.username}/>
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
                            <Route exact path='/login' component = {() => <LoginForm get_token={(username, password) => this.get_token(username, password)}/>} />

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
