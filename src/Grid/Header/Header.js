import React, { Fragment } from 'react';
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './Header.css';

const Header = (props) => {
  //   return (
  //     <Fragment>
  //       <br />
  //       <Button
  //         id="fence-button"
  //         style={{ margin: '10px 0 ' }}
  //         onClick={props.fenceToggle}
  //         variant="primary"
  //         children={'Make Fences'}
  //       />
  //       <br />
  // <Button
  //   id="button"
  //   style={{ margin: '10px 0 ' }}
  //   onClick={props.run}
  //   variant="primary"
  //   children={"Let's Run Dijkstra"}
  // />
  //     </Fragment>
  //   );
  // };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Algo-Visualiser</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <NavDropdown title="Algorithms" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Dijkstra</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav variant="center">
          <Button
            id="button"
            variant="primary"
            onClick={props.run}
            children={"Let's Run Dijkstra"}
          />
        </Nav>
        <Nav>
          <Nav.Link href="#deets">More deets</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            Contact
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;

Header.propTypes = {
  run: PropTypes.func.isRequired,
  fenceToggle: PropTypes.func.isRequired,
};
