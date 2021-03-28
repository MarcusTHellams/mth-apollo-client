import React from 'react';
import PropTypes from 'prop-types';
import { Spinner as Spin } from 'reactstrap';

const Spinner = ({ size = '31.25rem', ...restProps }) => {
  return (
    <div
      {...restProps}
      className='d-flex justify-content-center align-items-center h-100 w-100'
    >
      <Spin style={{ width: size, height: size }} color='primary' type='grow' />
    </div>
  );
};

Spinner.propTypes = {};
Spinner.defaultProps = {};

export default Spinner;
