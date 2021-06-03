import React from 'react';
import {Link} from 'react-router-dom'

const Menu = () => (
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
              </a>
          </nav>
    </menu>
);

export default Menu
