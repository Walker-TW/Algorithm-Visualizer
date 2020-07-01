import React, { useState } from "react";
import algorithmInfo from "./algorithms.js";
import { animateScroll as scroll } from "react-scroll";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  Image,
  Nav,
  Navbar,
  Modal,
  NavDropdown,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";
import PropTypes from "prop-types";
import {
  getDimensions,
  defaultNodeSize,
  maxFill,
} from "../../../Helpers/getDimensions";
import "./Header.css";

const Header = ({
  algorithm,
  animationSpeed,
  device,
  fenceToggle,
  ready,
  resizeGrid,
  resetFences,
  resetVisited,
  run: propRun,
  setAlgorithm,
  speed: propsSpeed,
  setNodeSize: propsNodeSize,
}) => {
  const mobile = device === "mobile";

  const [nodeSize, setNodeSize] = useState(defaultNodeSize);

  const [screenWidth, screenHeight] = getDimensions();
  const defaultDimensions = [
    maxFill(window.innerWidth, nodeSize),
    mobile ? maxFill(window.innerHeight, nodeSize) : screenHeight,
  ];
  const [maxDimensions, setMaxDimensions] = useState(defaultDimensions);

  const [maxWidth, maxHeight] = maxDimensions;

  // form value display
  const [width, setWidth] = useState(Math.ceil(screenWidth));
  const [height, setHeight] = useState(Math.ceil(screenHeight));
  const [speed, setSpeed] = useState(propsSpeed);

  // bootstrap
  const [show, setShow] = useState();
  const [expanded, setExpanded] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const collapseNav = () => setExpanded(false);

  const run = () => {
    if (algorithm === "") alert("Please select an algorithm");

    if (!ready)
      alert(
        "Please choose a start and finish point before running by clicking on the desired squares"
      );

    if (ready && algorithm) {
      if (mobile) {
        setTimeout(() => propRun(), 200);
        collapseNav();
        scroll.scrollToBottom({
          duration: 1200,
          delay: 100,
          smooth: true,
        });
      } else setTimeout(() => propRun(), 200);
    }
  };

  const nodeSizeHandler = (e) => {
    // for display
    setNodeSize(e.target.value);
    // for visualizer to change node inline style
    propsNodeSize(e.target.value);

    let [width, height] = getDimensions(e.target.value);

    resizeGrid([width, height]);
    setMaxDimensions([
      maxFill(window.innerWidth, nodeSize),
      mobile ? maxFill(window.innerWidth, e.target.value) : height,
    ]);
    setWidth(width);
    setHeight(height);
  };

  const gitHubImage = (
    <Image
      src="/images/github.png"
      className={"github-img"}
      alt={"Github"}
      fluid
    />
  );

  const linkedInImage = (
    <Image
      src="/images/linkedin.png"
      alt={"LinkedIn"}
      className={"linkedin-img"}
      fluid
    />
  );

  const algorithmDropdowns = algorithmInfo.map((alg, i) => {
    return (
      <OverlayTrigger
        key={i}
        trigger={["hover", "focus"]}
        placement={mobile ? "bottom" : "right"}
        overlay={
          <Popover id={`${alg.id}-popover`}>
            <Popover.Title as="h2" children={`${alg.name}`} />
            <Popover.Content>
              <p>
                <strong>{`${alg.header}`}</strong>
              </p>
              <p style={{ whiteSpace: "pre-line" }}>{`${alg.content}`}</p>
              <p>{`${alg.footer}`}</p>
            </Popover.Content>
          </Popover>
        }
      >
        <NavDropdown.Item
          id={`set-${alg.id}`}
          onClick={() => setAlgorithm(`${alg.name}`)}
          children={`${alg.name}`}
          active={algorithm === `${alg.name}`}
        />
      </OverlayTrigger>
    );
  });

  const howToUse = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>How To Use</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            1. Place a start and end point by clicking on the grid! (You can
            remove them by clicking on them again)
          </Row>
          <Row>
            {" "}
            2. Then place fences by checking "Fence Mode" and clicking on the
            grid.{" "}
          </Row>
          <Row>3. Choose an algorithm via the "Algorithms" dropdown. </Row>
          <Row>4. Run it via pressing the green "Run Algorithm" button. </Row>
          <Row>5. Enjoy!</Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const settings = (
    <DropdownButton title="Settings" size="sm" variant="dark">
      <Container variant="dark">
        <Row>
          <Form variant="dark" inline>
            <Col>
              Node Size
              <FormControl
                size="sm"
                type="text"
                placeholder={`Currently ${nodeSize})`}
                onChange={(e) => {
                  setNodeSize(e.target.value);
                }}
              />
              <Form.Control
                type="range"
                size="sm"
                min="10"
                max="100"
                value={nodeSize}
                onChange={nodeSizeHandler}
                custom
              />
              Grid Size
              <FormControl
                size="sm"
                type="text"
                placeholder={`Width (Currently ${width})`}
                onChange={(e) => {
                  setWidth(e.target.value);
                }}
              />
              <Form.Control
                type="range"
                size="sm"
                min="1"
                max={maxWidth}
                value={width}
                onChange={(e) => {
                  setWidth(e.target.value);
                  resizeGrid([e.target.value, height]);
                }}
                custom
              />
              <NavDropdown.Divider />
              <FormControl
                type="text"
                size="sm"
                placeholder={`Height (Currently ${height})`}
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
                className="Row-Input"
              />
              <Form.Control
                type="range"
                min="1"
                max={maxHeight}
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                  resizeGrid([width, e.target.value]);
                }}
                custom
              />
              <NavDropdown.Divider />
              <Form.Label children={"Draw Square"} />
              <Form.Control
                type="range"
                size="sm"
                min="1"
                max={mobile ? maxWidth : maxHeight}
                value={(height, width)}
                onChange={(e) => {
                  setWidth(e.target.value);
                  setHeight(e.target.value);
                  resizeGrid([e.target.value, e.target.value]);
                }}
                custom
              />
              <NavDropdown.Divider />
              <Form.Label children={"Animation Speed"} />
              <Form.Control
                type="range"
                min="1"
                max="5"
                value={speed}
                onChange={(e) => {
                  setSpeed(e.target.value);
                  animationSpeed(e.target.value);
                }}
                custom
              />
            </Col>
          </Form>
        </Row>
      </Container>
    </DropdownButton>
  );

  const contactInfo = (
    <DropdownButton title=" Contact The Creators" size="sm" id="contact-info">
      <Container>
        <Row>
          <NavDropdown.Item id={"bassel"} children={"Bassel"} />
          <a
            className={"image-link"}
            href="https://github.com/basselalsayed"
            children={gitHubImage}
          />
          <a
            className={"image-link"}
            href="https://www.linkedin.com/in/bsas/"
            children={linkedInImage}
          />
        </Row>
        <Row>
          <NavDropdown.Item id={"tom"} children={"Tom"} />
          <a
            className={"image-link"}
            href="https://github.com/Walker-TW"
            children={gitHubImage}
          />
          <a
            className={"image-link"}
            href="https://www.linkedin.com/in/thomas-w-walker"
            children={linkedInImage}
          />
        </Row>
      </Container>
    </DropdownButton>
  );

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      bg="dark"
      variant="dark"
      collapseOnSelect
    >
      <Navbar.Brand
        href="https://github.com/Walker-TW/Algorithm-Visualizer"
        children={"Algo-Visualiser"}
      />
      <Navbar.Toggle
        onClick={() => setExpanded(expanded ? false : "lg")}
        aria-controls="responsive-navbar-nav"
      />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Container fluid>
          <Col md={{ span: 2 }}>
            <Nav className="mr-auto">
              <NavDropdown title="Algorithms" id="collapsible-nav-dropdown">
                {algorithmDropdowns}
              </NavDropdown>
            </Nav>
          </Col>
          <Col md={{ span: 4 }}>
            <Nav>
              <Button
                id="info-btn"
                style={{ border: "2px solid cyan", color: "cyan" }}
                variant="dark"
                children={"How To Use"}
                onClick={handleShow}
              />
              {howToUse}
              <Button
                id="run-btn"
                style={{ border: "2px solid chartreuse", color: "chartreuse" }}
                variant="dark"
                onClick={run}
                children={
                  algorithm
                    ? `Let's Run ${algorithm}`
                    : "Please Select Algorithm"
                }
                disabled={!ready || algorithm === ""}
              />
              <Dropdown as={ButtonGroup}>
                <Button
                  id="reset-btn"
                  variant="dark"
                  style={{ border: "2px solid red", color: "red" }}
                  children={"Reset Visited"}
                  onClick={resetVisited}
                />
                <Dropdown.Toggle
                  split
                  variant="dark"
                  style={{ border: "2px solid red", color: "red" }}
                  id="dropdown-custom-2"
                />
                <Dropdown.Menu>
                  <Dropdown.Item
                    id="fence-reset-btn"
                    onClick={resetFences}
                    variant="dark"
                    children={"Reset Fences"}
                  />
                </Dropdown.Menu>
              </Dropdown>
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
                    style={{ color: "white" }}
                    onChange={fenceToggle}
                  />
                </Form>
              </Container>
              {settings}
              {contactInfo}
            </Nav>
          </Col>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
};
export { Header };

Header.propTypes = {
  algorithm: PropTypes.string.isRequired,
  animationSpeed: PropTypes.func.isRequired,
  device: PropTypes.string.isRequired,
  fenceToggle: PropTypes.func.isRequired,
  ready: PropTypes.bool.isRequired,
  resetFences: PropTypes.func.isRequired,
  resetVisited: PropTypes.func.isRequired,
  resizeGrid: PropTypes.func.isRequired,
  run: PropTypes.func.isRequired,
  setAlgorithm: PropTypes.func.isRequired,
  speed: PropTypes.string.isRequired,
};
