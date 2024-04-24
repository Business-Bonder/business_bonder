import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { AiFillHome, AiFillBell } from 'react-icons/ai';
import { Roles } from 'meteor/alanning:roles'; // Import Roles from alanning:roles package

const NavBar = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <h2>Business Bonder</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {currentUser ? (
              <>
                {Roles.userIsInRole(Meteor.userId(), 'admin') && (
                  <>
                    <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/admin">Admin</Nav.Link>
                    <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/adminEdit">Admin Edit</Nav.Link>
                  </>
                )}
              </>
            ) : null}

          </Nav>
          <Nav className="align-items-center">
            <Nav.Link id="add-contact-nav" as={NavLink} to="/home" className="d-flex flex-column align-items-center">
              <AiFillBell size={25} />
              <div>Notifications</div>
            </Nav.Link>
            <Nav.Link id="add-contact-nav" as={NavLink} to="/home" className="d-flex flex-column align-items-center">
              <AiFillHome size={25} />
              <div>Home</div>
            </Nav.Link>
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
