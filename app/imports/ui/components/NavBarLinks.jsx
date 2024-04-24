{ currentUser ? ([
  <Nav.Link id="add-contact-nav" as={NavLink} to="/add" key="add">Add Contact</Nav.Link>,
  <Nav.Link id="list-contact-nav" as={NavLink} to="/list" key="list">List Contacts</Nav.Link>,
]) : ''; }
{ Roles.userIsInRole(Meteor.userId(), 'admin') ? (
  <Nav.Link id="list-contact-admin-nav" as={NavLink} to="/admin" key="admin">Admin</Nav.Link>
) : ''; }
