import React from 'react'
import {Navbar as TopNavbar,Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import {useAuth} from '../../Context/AuthContext'
const Navbar = () => {
  const {userInfo}=useAuth();
    return (
        
        <TopNavbar bg="light" expand="sm">
          <TopNavbar.Brand as={Link} to="/">
              PRINT-X
          </TopNavbar.Brand>
          <Nav>
          <Nav.Link as={Link} to="/user">
            Profile
          </Nav.Link>
          {
            userInfo&&(userInfo?.role==="Admin"||userInfo?.role==="Teacher")&&(
              <>
          <Nav.Link as={Link} to="/signup">
            Register user
          </Nav.Link>
          <Nav.Link as={Link} to="/givepoints">
            Give Points
          </Nav.Link>
          </>
          )
          }
          </Nav>
        </TopNavbar>

    )
}

export default Navbar
