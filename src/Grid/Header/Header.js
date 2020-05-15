import React, { Fragment } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './Header.css';

const Header = (props) => {
  return (
    <Fragment>
      <Button
        id="button"
        style={{ margin: '10px 0 ' }}
        onClick={props.run}
        variant="primary"
        children={"Let's Run Dijkstra"}
      />
      <Button
        id="button"
        style={{ margin: '10px 0 ', backgroundColor: 'red' }}
        onClick={props.reset}
        variant="primary"
        children={'Reset'}
      />
    </Fragment>
  );
};

export default Header;

Header.propTypes = {
  run: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};
