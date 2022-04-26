import {Container,Breadcrumb} from 'react-bootstrap'
import {Link, NavLink} from 'react-router-dom';

import './Nav.scss'

const Nav = () => {

    return(
        <Container>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink exact 
                        className={isActive =>
                            "btn " + (!isActive ? "btn-outline-primary" : "btn-primary")
                        } 
                        to="/boards">
                            Boards
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink 
                        className={isActive =>
                            "btn " + (!isActive ? "btn-outline-primary" : "btn-primary")
                        } 
                        to="/colums">
                            Colums
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </Container>
    )
}

export default Nav;