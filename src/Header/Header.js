import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <Button
      style={{ margin: '10px 0 ' }}
      onClick={props.run}
      variant="primary"
      children={"Let's Run Dijkstra"}
    />
  );
};

export default Header;

Header.propTypes = {
  run: PropTypes.func.isRequired,
};
