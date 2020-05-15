import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

import "./Header.css";

const Header = (props) => {
  return (
    <Fragment>
      <br />
      <Button
        id="wall-button"
        style={{ margin: "10px 0 " }}
        onClick={props.wall}
        variant="primary"
        children={"Wall selector"}
      />
      <br />
      <Button
        id="button"
        style={{ margin: "10px 0 " }}
        onClick={props.run}
        variant="primary"
        children={"Let's Run Dijkstra"}
      />
    </Fragment>
  );
};

export default Header;

Header.propTypes = {
  run: PropTypes.func.isRequired,
};
