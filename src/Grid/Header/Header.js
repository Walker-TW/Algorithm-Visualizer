import React from 'react';
import { Button, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './Header.css';

const Header = (props) => {
  const { algorithm, fenceToggle, run, reset, setAlgorithm } = props;

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home" children={'Algo-Visualiser'} />
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features" children={'Features'} />
          <Nav.Link href="#pricing" children={'Pricing'} />
          <NavDropdown title="Algorithms" id="collasible-nav-dropdown">
            <NavDropdown.Item
              id={'set-dijkstra'}
              onClick={() => setAlgorithm('dijkstra')}
              children={'Dijkstra'}
            />
            <NavDropdown.Divider />
            <NavDropdown.Item
              id={'set-astar'}
              onClick={() => setAlgorithm('astar')}
              children={'A*'}
            />
            <NavDropdown.Item children={'Something'} />
            <NavDropdown.Divider />
            <NavDropdown.Item children={'Separated link'} />
          </NavDropdown>
          <Form>
            <Form.Check
              type="checkbox"
              id="fence-check"
              name="fences"
              label="Fence mode"
              style={{ color: 'white' }}
              onChange={fenceToggle}
            />
          </Form>
        </Nav>
        <Nav variant="center">
          <Button
            id="button"
            style={{ border: '2px solid yellow', color: 'yellow' }}
            variant="dark"
            onClick={run}
            children={algorithm ? `Let's Run ${algorithm}` : 'Select Algorithm'}
          />
          <Button
            id="reset-btn"
            style={{ border: '2px solid red', color: 'red' }}
            variant="dark"
            onClick={reset}
            children={'Reset'}
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
  algorithm: PropTypes.string.isRequired,
  run: PropTypes.func.isRequired,
  fenceToggle: PropTypes.func.isRequired,
  setAlgorithm: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};
