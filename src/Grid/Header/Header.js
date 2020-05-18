import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

import "./Header.css";

const Header = (props) => {
  return (
    <Fragment>
      <br />
      <Button
        id="fence-button"
        style={{ margin: "10px 0 " }}
        onClick={props.fenceToggle}
        variant="primary"
        children={"Make Fences"}
      />
      <br />
      <Button
        id="button"
        style={{ margin: "10px 0 " }}
        onClick={props.run}
        variant="primary"
        children={"Let's Run Dijkstra"}
      />
      <br />
      <Button
        id="astar-button"
        style={{ margin: "10px 0 " }}
        onClick={props.aStar}
        variant="primary"
        children={"Let's Run A*"}
      />
    </Fragment>
  );
};

export default Header;

Header.propTypes = {
  run: PropTypes.func.isRequired,
  fenceToggle: PropTypes.func.isRequired,
};
