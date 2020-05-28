import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  DropdownButton,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import PropTypes from "prop-types";

import "./Header.css";

const Header = (props) => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [speed, setSpeed] = useState();

  const {
    algorithm,
    animationSpeed,
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
    let speedOfAnimation = speed;
    animationSpeed(speedOfAnimation);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand
        href="https://github.com/Walker-TW/Algorithm-Visualizer"
        children={"Algo-Visualiser"}
      />
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Container fluid>
          <Col>
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
            </Nav>
          </Col>
          <Col>
            <Nav>
              <Button
                id="run-btn"
                style={{ border: "2px solid chartreuse", color: "chartreuse" }}
                variant="dark"
                onClick={run}
                children={
                  algorithm
                    ? `Let's Run ${algorithm}`
                    : "Please Select An Algorithm"
                }
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
          </Col>
          <Col>
            <Nav navbar="true">
              <Container>
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
              </Container>
              <DropdownButton title="Settings" size="sm" variant="secondary">
                <Container>
                  <Row>
                    <Form onSubmit={handleSubmit} inline>
                      <Col>
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
                      </Col>
                      <Col>
                        <Form.Group controlId="formBasicRange">
                          <Form.Label> Animation Speed</Form.Label>
                          <Form.Control
                            type="range"
                            size="sm"
                            min="1"
                            max="5"
                            value={speed}
                            onChange={(e) => setSpeed(e.target.value)}
                            placeholder="Speed"
                            className="Speed-Input"
                          />
                        </Form.Group>
                      </Col>
                      <Button variant="danger" type="submit" block>
                        Update
                      </Button>
                    </Form>
                  </Row>
                </Container>
              </DropdownButton>
              <DropdownButton
                title="Contact The Team"
                size="sm"
                id="contact-info"
              >
                <Container>
                  <Row>
                    <NavDropdown.Item
                      id={"basselGit"}
                      children={"Bassel's Git"}
                      href={"https://github.com/basselalsayed"}
                    />
                  </Row>
                  <Row>
                    <NavDropdown.Item
                      id={"basselLink"}
                      children={"Bassel's LinkedIn"}
                      href={"https://www.linkedin.com/in/bsas/"}
                    />
                  </Row>
                </Container>
                <Container>
                  <Row>
                    <NavDropdown.Item
                      id={"tomGit"}
                      children={"Tom's Git"}
                      href={"https://github.com/Walker-TW"}
                    />
                  </Row>
                  <Row>
                    <NavDropdown.Item
                      id={"tomLink"}
                      children={"Tom's LinkedIn"}
                      href={"https://www.linkedin.com/in/thomas-w-walker/"}
                    />
                  </Row>
                </Container>
              </DropdownButton>
            </Nav>
          </Col>
        </Container>
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
