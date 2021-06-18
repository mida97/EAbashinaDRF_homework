import React from 'react';
import {Link} from 'react-router-dom'

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
    return (
        <menu>
            <nav>
                  <a>
                    <Link to='/users'>Users</Link>
                  </a> |
                  <a>
                    <Link to='/projects'>Projects</Link>
                  </a> |
                  <a>
                    <Link to='/todos'>ToDo</Link>
                  </a> |
                  <a>{
                      this.props.is_auth() ?
                      <a>Вы зашли как {this.props.username}</a> :
                      null
                  }
                  </a>
                  <a>{
                        this.props.is_auth() ?
                            <Link to='/login' onClick={() => this.props.logout()}>Logout</Link> :
                            <Link to='/login'>Login</Link>
                  }
                  </a>
              </nav>
        </menu>
    )
    }
}

export default Menu
