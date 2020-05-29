import React, { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  Nav,
  Navbar,
  Modal,
  NavDropdown,
  Row,
  SplitButton,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getDimensions, getMax } from '../../Helpers/getDimensions';
import './Header.css';

const Header = (props) => {
  const {
    algorithm,
    animationSpeed,
    fenceToggle,
    ready,
    resizeGrid,
    resetFences,
    resetVisited,
    run: propRun,
    setAlgorithm,
    speed: propsSpeed,
  } = props;

  const [screenWidth, screenHeight] = getDimensions();
  const [maxWidth, maxHeight] = getMax();
  const [width, setWidth] = useState(Math.ceil(screenWidth));
  const [height, setHeight] = useState(Math.ceil(screenHeight));
  const [speed, setSpeed] = useState(propsSpeed);
  const [show, setShow] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <Navbar.Brand
        href="https://github.com/Walker-TW/Algorithm-Visualizer"
        children={'Algo-Visualiser'}
      />
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Container fluid>
          <Col md={{ span: 2 }}>
            <Nav className="mr-auto">
              <NavDropdown title="Algorithms" id="collasible-nav-dropdown">
                <NavDropdown.Item
                  id={'set-dijkstra'}
                  onClick={() => setAlgorithm('Dijkstra')}
                  children={'Dijkstra'}
                  active={algorithm === 'Dijkstra'}
                />
                <NavDropdown.Item
                  id={'set-astar-euclidean'}
                  onClick={() => setAlgorithm('A* Euclidean')}
                  children={'A* (Euclidean Distance)'}
                  active={algorithm === 'A* Euclidean'}
                />
                <NavDropdown.Item
                  id={'set-astar-manhatten'}
                  onClick={() => setAlgorithm('A* Manhatten')}
                  children={'A* (Manhatten Distance)'}
                  active={algorithm === 'A* Manhatten'}
                />
                <NavDropdown.Item
                  id={'set-depth-first-search'}
                  onClick={() => setAlgorithm('Depth First Search')}
                  children={'Depth First Search'}
                  active={algorithm === 'Depth First Search'}
                />
                <NavDropdown.Item
                  id={'set-breadth-first-search'}
                  onClick={() => setAlgorithm('Breadth First Search')}
                  children={'Breadth First Search'}
                  active={algorithm === 'Breadth First Search'}
                />
              </NavDropdown>
            </Nav>
          </Col>
          <Col md={{ span: 4 }}>
            <Nav>
              <Button
                id="maze-btn"
                style={{ border: '2px solid cyan', color: 'cyan' }}
                variant="dark"
                children={'How To Use'}
                onClick={handleShow}
              />
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>How To Use</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Container>
                    <Row>
                      1. Place a start and end point by clicking on the grid!
                    </Row>
                    <Row>
                      {' '}
                      2. Then place fences by checking "Fence Mode" and clicking
                      on the grid.{' '}
                    </Row>
                    <Row>
                      3. Choose an algorithm via the "Algorithms" dropdown.{' '}
                    </Row>
                    <Row>
                      4. Run it via pressing the green "Run Algorithm" button.{' '}
                    </Row>
                    <Row>5. Enjoy!</Row>
                  </Container>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              <Button
                id="run-btn"
                style={{ border: '2px solid chartreuse', color: 'chartreuse' }}
                variant="dark"
                onClick={run}
                children={
                  algorithm
                    ? `Let's Run ${algorithm}`
                    : 'Please Select An Algorithm'
                }
                disabled={!ready || algorithm === ''}
              />
              <SplitButton
                title="Reset Visited"
                id="reset-btn"
                style={{ border: '2px solid red', color: 'red' }}
                onClick={resetVisited}
                variant="dark"
              >
                <Dropdown.Item
                  id="fence-reset-btn"
                  onClick={resetFences}
                  variant="dark"
                  children={'Reset Fences'}
                />
              </SplitButton>
            </Nav>
          </Col>
          <Col md={{ span: 4 }}>
            <Nav navbar="true">
              <Container>
                <Form inline>
                  <Form.Check
                    type="switch"
                    id="fence-check"
                    name="fences"
                    label="Fence mode"
                    style={{ color: 'white' }}
                    onChange={fenceToggle}
                  />
                </Form>
              </Container>
              <DropdownButton title="Settings" size="sm" variant="dark">
                <Container variant="dark">
                  <Row>
                    <Form variant="dark" inline>
                      <Col>
                        Grid Size
                        <FormControl
                          size="sm"
                          type="text"
                          placeholder={`Width (Currently ${width})`}
                          onChange={(e) => setWidth(e.target.value)}
                          // className="Column-Input"
                        />
                        <Form.Control
                          type="range"
                          size="sm"
                          min="1"
                          max={maxWidth}
                          value={width}
                          onChange={(e) => {
                            setWidth(e.target.value);
                            resizeGrid([width, height]);
                          }}
                          custom
                        />
                        <NavDropdown.Divider />
                        <FormControl
                          type="text"
                          size="sm"
                          placeholder={`Height (Currently ${height})`}
                          onChange={(e) => setHeight(e.target.value)}
                          className="Row-Input"
                        />
                        <Form.Control
                          type="range"
                          min="1"
                          max={maxHeight}
                          value={height}
                          onChange={(e) => {
                            setHeight(e.target.value);
                            resizeGrid([width, height]);
                          }}
                          custom
                        />
                        <NavDropdown.Divider />
                        <Form.Label children={'Draw Square'} />
                        <Form.Control
                          type="range"
                          size="sm"
                          min="1"
                          max="50"
                          value={(height, width)}
                          onChange={(e) => {
                            setWidth(e.target.value);
                            setHeight(e.target.value);
                            resizeGrid([height, height]);
                          }}
                          custom
                        />
                        <NavDropdown.Divider />
                        <Form.Label children={'Animation Speed'} />
                        <Form.Control
                          type="range"
                          min="1"
                          max="5"
                          value={speed}
                          onChange={(e) => {
                            setSpeed(e.target.value);
                            animationSpeed(speed);
                          }}
                          custom
                        />
                      </Col>
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
                      id={'basselGit'}
                      children={"Bassel's Git"}
                      href={'https://github.com/basselalsayed'}
                    />
                  </Row>
                  <Row>
                    <NavDropdown.Item
                      id={'basselLink'}
                      children={"Bassel's LinkedIn"}
                      href={'https://www.linkedin.com/in/bsas/'}
                    />
                  </Row>
                </Container>
                <Container>
                  <Row>
                    <NavDropdown.Item
                      id={'tomGit'}
                      children={"Tom's Git"}
                      href={'https://github.com/Walker-TW'}
                    />
                  </Row>
                  <Row>
                    <NavDropdown.Item
                      id={'tomLink'}
                      children={"Tom's LinkedIn"}
                      href={'https://www.linkedin.com/in/thomas-w-walker/'}
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
  animationSpeed: PropTypes.func.isRequired,
  fenceToggle: PropTypes.func.isRequired,
  ready: PropTypes.bool.isRequired,
  resetFences: PropTypes.func.isRequired,
  resetVisited: PropTypes.func.isRequired,
  resizeGrid: PropTypes.func.isRequired,
  run: PropTypes.func.isRequired,
  setAlgorithm: PropTypes.func.isRequired,
  speed: PropTypes.string.isRequired,
};
