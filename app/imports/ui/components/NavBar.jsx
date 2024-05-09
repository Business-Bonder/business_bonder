import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { AiFillHome, AiFillBell } from 'react-icons/ai';
import Col from 'react-bootstrap/Col';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
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
          <Nav className="me-auto justify-content-start" />
          <Nav className="me-auto">
            {currentUser ? (
              // eslint-disable-next-line react/jsx-no-useless-fragment
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
          <Nav className="justify-content-end">
            <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Nav.Link id="add-contact-nav" as={NavLink} to="/notifs" key="home">
                <div style={{ marginTop: '0px', marginLeft: '40px', paddingRight: '35px' }}><AiFillBell size={25} /></div>
                <div style={{ marginTop: '-5px', marginLeft: '10px', fontSize: '15px' }}>Notifications</div>
              </Nav.Link>
            </Col>
            <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Nav.Link id="add-contact-nav" as={NavLink} to="/studenthome" key="home">
                <div style={{ marginTop: '0px', marginLeft: '-13px' }}><AiFillHome size={25} /></div>
                <div style={{ marginTop: '-5px', marginLeft: '-20px', fontSize: '15px' }}>Home</div>
              </Nav.Link>
            </Col>
            <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Nav.Link id="add-contact-nav" as={NavLink} to="/add" key="home">
                <div style={{ marginTop: '-2px', marginLeft: '-20px', fontSize: '15px' }}>Create Your Profile</div>
              </Nav.Link>
            </Col>
            <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Nav.Link id="add-contact-nav" as={NavLink} to="/addcompany" key="home">
                <div style={{ marginTop: '-2px', marginLeft: '-20px', fontSize: '15px' }}>Add Your Company</div>
              </Nav.Link>
            </Col>
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
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
