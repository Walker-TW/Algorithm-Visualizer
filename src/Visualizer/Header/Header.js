import React from "react";
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
  // this.state = {
  //   row: null,
  //   column: null,
  // };
  const {
    algorithm,
    fenceToggle,
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

  const print = () => {
    const { width, column } = this.props;
    console.log(width, column);
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
              onClick={() => setAlgorithm("dijkstra")}
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
            <NavDropdown.Divider />
            <NavDropdown.Item children={"Separated link"} />
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
          <Form inline>
            Grid Size
            <FormControl
              size="sm"
              type="text"
              placeholder="Column"
              className="Column"
              inputRef={(ref) => {
                this.column = ref;
              }}
            />
            <FormControl
              type="text"
              size="sm"
              placeholder="Row"
              className="Row"
              inputRef={(ref) => {
                this.row = ref;
              }}
            />
            <Form.Group controlId="formBasicRange">
              <Form.Label> Speed</Form.Label>
              <Form.Control type="range" />
            </Form.Group>
            <Button
              variant="danger"
              type="submit"
              onClick={console.log(this.row, this.column)}
              block
            >
              Update
            </Button>
          </Form>
        </DropdownButton>
        <Nav>
          <Nav.Link href="#deets">More deets</Nav.Link>
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
