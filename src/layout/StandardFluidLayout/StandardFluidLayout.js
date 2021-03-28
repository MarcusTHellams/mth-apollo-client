import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

const StandardFluidLayout = ({ children }) => (
  <Container fluid className='mt-5 pt-4'>
    {children}
  </Container>
);

StandardFluidLayout.propTypes = {};

StandardFluidLayout.defaultProps = {};

export default StandardFluidLayout;
