import React from 'react';
import { Button, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Info from '../Info/Info';

import './Header.css';

const Header = (props) => {
  const {
    algorithm,
    fenceToggle,
    ready,
    run: propRun,
    reset,
    setAlgorithm,
  } = props;

  const run = () => {
    if (algorithm === '') {
      alert('Please select an algorithm');
    }
    if (!ready) {
      alert(
        'Please choose a start and finish point before running by clicking on the desired squares'
      );
    }
    if (ready && algorithm) {
      propRun();
    }
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home" children={'Algo-Visualiser'} />
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features" children={'Features'} />
          <NavDropdown title="Mazes">
            <NavDropdown.Item children={'1'} />
            <NavDropdown.Divider />
            <NavDropdown.Item children={'2'} />
            <NavDropdown.Divider />
            <NavDropdown.Item children={'3?'} />
            <NavDropdown.Divider />
          </NavDropdown>
          <NavDropdown title="Algorithms" id="collasible-nav-dropdown">
            <NavDropdown.Item
              id={'set-dijkstra'}
              onClick={() => setAlgorithm('dijkstra')}
              children={'Dijkstra'}
            />
            <NavDropdown.Divider />
            <NavDropdown.Item
              id={'set-astar-euclidean'}
              onClick={() => setAlgorithm('A* Euclidean')}
              children={'A* (Euclidean Distance)'}
            />
            <NavDropdown.Item
              id={'set-astar-manhatten'}
              onClick={() => setAlgorithm('A* Manhatten')}
              children={'A* (Manhatten Distance)'}
            />
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
          <Info />
        </Nav>
        <Nav variant="center">
          <Button
            id="run-btn"
            style={{ border: '2px solid yellow', color: 'yellow' }}
            variant="dark"
            onClick={run}
            children={algorithm ? `Let's Run ${algorithm}` : 'Select Algorithm'}
            disabled={!ready || algorithm === ''}
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
  ready: PropTypes.bool.isRequired,
  run: PropTypes.func.isRequired,
  fenceToggle: PropTypes.func.isRequired,
  setAlgorithm: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};
