import React, { useState } from "react";
import {
  Button,
  DropdownButton,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import PropTypes from "prop-types";

import "./Header.css";

const Header = (props) => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  const {
    algorithm,
    fenceToggle,
    gridSetup,
    defaultStateSizeChange,
    ready,
    run: propRun,
    reset,
    setAlgorithm,
  } = props;

  const run = () => {
    if (algorithm === "") {
      alert("Please select an algorithm");
    }
    if (!ready) {
      alert(
        "Please choose a start and finish point before running by clicking on the desired squares"
      );
    }
    if (ready && algorithm) {
      propRun();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let array = [width, height];
    defaultStateSizeChange();
    gridSetup(array);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand
        href="https://github.com/Walker-TW/Algorithm-Visualizer"
        children={"Algo-Visualiser"}
      />
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Mazes">
            <NavDropdown.Item children={"1"} />
            <NavDropdown.Divider />
            <NavDropdown.Item children={"2"} />
            <NavDropdown.Divider />
            <NavDropdown.Item children={"3?"} />
            <NavDropdown.Divider />
          </NavDropdown>
          <NavDropdown title="Algorithms" id="collasible-nav-dropdown">
            <NavDropdown.Item
              id={"set-dijkstra"}
              onClick={() => setAlgorithm("Dijkstra")}
              children={"Dijkstra"}
            />
            <NavDropdown.Item
              id={"set-astar-euclidean"}
              onClick={() => setAlgorithm("A* Euclidean")}
              children={"A* (Euclidean Distance)"}
            />
            <NavDropdown.Item
              id={"set-astar-manhatten"}
              onClick={() => setAlgorithm("A* Manhatten")}
              children={"A* (Manhatten Distance)"}
            />
            <NavDropdown.Item
              id={"set-depth-first-search"}
              onClick={() => setAlgorithm("Depth First Search")}
              children={"Depth First Search"}
            />
            <NavDropdown.Item
              id={"set-breadth-first-search"}
              onClick={() => setAlgorithm("Breadth First Search")}
              children={"Breadth First Search"}
            />
          </NavDropdown>
          <Form inline>
            <Form.Check
              type="checkbox"
              id="fence-check"
              name="fences"
              label="Fence mode"
              style={{ color: "white" }}
              onChange={fenceToggle}
            />
          </Form>
        </Nav>
        <Nav variant="center">
          <Button
            id="run-btn"
            style={{ border: "2px solid yellow", color: "yellow" }}
            variant="dark"
            onClick={run}
            children={algorithm ? `Let's Run ${algorithm}` : "Select Algorithm"}
            disabled={!ready || algorithm === ""}
          />
          <Button
            id="reset-btn"
            style={{ border: "2px solid red", color: "red" }}
            variant="dark"
            onClick={reset}
            children={"Reset"}
          />
        </Nav>
        <DropdownButton title="Settings" size="sm" variant="secondary">
          <Form onSubmit={handleSubmit} inline>
            Grid Size
            <FormControl
              size="sm"
              type="text"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Column"
              className="Column-Input"
            />
            <FormControl
              type="text"
              size="sm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Row"
              className="Row-Input"
            />
            <Form.Group controlId="formBasicRange">
              <Form.Label> Speed</Form.Label>
              <Form.Control type="range" />
            </Form.Group>
            <Button variant="danger" type="submit" block>
              Update
            </Button>
          </Form>
        </DropdownButton>
        <Nav>
          <Nav.Link eventKey={2}>Contact</Nav.Link>
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
