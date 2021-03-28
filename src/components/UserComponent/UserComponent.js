import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardText,
  Row,
  Col,
} from 'reactstrap';
import UserEditModal from 'components/UserEditModal/UserEditModal';

const UserComponent = ({ user = {} }) => {
  const { address } = user;
  const { city, street, zipcode, suite } = address;

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleModal = React.useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  return (
    <>
      <Row className='justify-content-center'>
        <Col md={6}>
          <Card className='shadow-lg'>
            <CardHeader className='bg-primary text-white' tag='h3'>
              {user?.name}
            </CardHeader>
            <CardBody>
              <CardText tag='dl' className='row no-gutters'>
                <dt className='col-md-3'>Username</dt>
                <dd className='col-md-8'>{user?.username}</dd>
                <dt className='col-md-3'>Email</dt>
                <dd className='col-md-9'>{user?.email}</dd>
                <dt className='col-md-3'>Phone</dt>
                <dd className='col-md-9'>{user?.phone}</dd>
                <dt className='col-md-3'>Website</dt>
                <dd className='col-md-9'>{user?.website}</dd>
                <dt className='col-md-3'>Address</dt>
                <dd className='col-md-9'>
                  {street}
                  <br />
                  {suite ? (
                    <>
                      {suite} <br />
                    </>
                  ) : null}
                  {city}
                  {', '}
                  {zipcode}
                </dd>
              </CardText>
            </CardBody>
            <CardFooter className='bg-primary text-white'>
              <Button className='text-white' color='link' onClick={toggleModal}>
                Edit User
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
      <UserEditModal {...{ user, isOpen }} toggle={toggleModal} />
    </>
  );
};

UserComponent.propTypes = {};
UserComponent.defaultProps = {};

export default UserComponent;
