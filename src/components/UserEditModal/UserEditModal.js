import React, { Fragment, useMemo } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Spinner,
  FormFeedback,
} from 'reactstrap';
import { useForm, useFieldArray } from 'react-hook-form';
import { updateUser } from 'graphql/mutations';
import { useMutation } from '@apollo/client';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import get from 'lodash.get';

const inputFields = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
  },
  {
    label: 'Username',
    name: 'username',
    type: 'text',
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
  },
  {
    label: 'Phone',
    name: 'phone',
    type: 'tel',
  },
  {
    label: 'Website',
    name: 'website',
    type: 'text',
  },
];

const addressFields = [
  {
    label: 'Street',
    name: 'address.street',
    type: 'text',
  },
  {
    label: 'Suite',
    name: 'address.suite',
    type: 'text',
  },
  {
    label: 'City',
    name: 'address.city',
    type: 'text,',
  },
  {
    label: 'Zip Code',
    name: 'address.zipcode',
    type: 'text',
  },
];

const CustomErrorMessage = props => {
  return (
    <>
      <ErrorMessage
        {...props}
        render={({ message }) => {
          return (
            <>
              <FormFeedback>{message}</FormFeedback>
            </>
          );
        }}
      />
    </>
  );
};

const schema = yup.object().shape({
  name: yup.string().trim().required('Name is Required'),
  username: yup.string().trim().required('Username is Required'),
  email: yup
    .string()
    .trim()
    .required('Username is Required')
    .email('A valid email is required'),
  website: yup
    .string()
    .trim()
    .required('Website is Required')
    .url('A valid url is required'),
  friends: yup
    .array()
    .max(2, 'You can only have two Friends')
    .of(
      yup.object().shape({
        name: yup.string().trim().required('A friends name is required'),
      })
    ),
});

const UserEditModal = ({ user = {}, isOpen, toggle }) => {
  const defaultValues = useMemo(() => {
    return {
      ...user,
      options: 'green',
      friends: [{ name: 'Marcus' }],
    };
  }, [user]);
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { fields, remove, append } = useFieldArray({
    name: 'friends',
    control,
  });

  const [_updateUser, { loading }] = useMutation(updateUser);

  const submitHandler = async data => {
    const { friends, ...rest } = data;
    rest.address.geo.lat = parseFloat(rest.address.geo.lat);
    rest.address.geo.lng = parseFloat(rest.address.geo.lng);
    try {
      await _updateUser({
        variables: {
          id: user.id,
          input: rest,
        },
      });
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal backdrop='static' keyboard={false} size='xl' {...{ isOpen, toggle }}>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <input type='hidden' name='address.geo.lat' ref={register} />
        <input type='hidden' name='address.geo.lng' ref={register} />
        <ModalHeader {...{ toggle }}>Edit {user?.name}</ModalHeader>
        <ModalBody>
          {inputFields.map(field => {
            console.log('field.name: ', field.name);
            return (
              <Fragment key={field.name}>
                <FormGroup row className='no-gutters'>
                  <Label sm={2} htmlFor={field.name}>
                    {field.label}:
                  </Label>
                  <Col sm={10}>
                    <Input
                      id={field.name}
                      invalid={!!get(errors, `${field.name}`)}
                      innerRef={register}
                      name={field.name}
                      type={field.type}
                    />
                    <CustomErrorMessage {...{ errors }} name={field.name} />
                  </Col>
                </FormGroup>
              </Fragment>
            );
          })}
          <FormGroup tag='fieldset'>
            <Label tag='legend'>Address</Label>
            <hr className='mt-0' />
            {addressFields.map(field => {
              console.log('field.name: ', field.name);
              return (
                <>
                  <Fragment key={field.name}>
                    <FormGroup row className='no-gutters'>
                      <Label sm={2} htmlFor={field.name}>
                        {field.label}:
                      </Label>
                      <Col sm={10}>
                        <Input
                          id={field.name}
                          invalid={!!get(errors, `${field.name}`)}
                          innerRef={register}
                          name={field.name}
                          type={field.type}
                        />
                        <CustomErrorMessage {...{ errors }} name={field.name} />
                      </Col>
                    </FormGroup>
                  </Fragment>
                </>
              );
            })}
          </FormGroup>
          {!!get(errors, 'friends') && (
            <>
              <div className='invalid-feedback' style={{ display: 'block' }}>
                {errors?.friends.message}
              </div>
            </>
          )}
          {fields.map((field, index) => {
            return (
              <Fragment key={field.id}>
                <FormGroup row className='no-gutters'>
                  <Label sm={2} htmlFor={`friends[${index}].name`}>
                    Friend Name:
                  </Label>
                  <Col sm={10}>
                    <Input
                      invalid={!!get(errors, `friends[${index}].name`)}
                      id={`friends[${index}].name`}
                      innerRef={register()}
                      name={`friends[${index}].name`}
                      type='text'
                      defaultValue={field.name}
                    />
                    <CustomErrorMessage
                      {...{ errors }}
                      name={`friends[${index}].name`}
                    />
                    <p className='mt-2'>
                      <Button
                        onClick={append.bind(null, {
                          name: '',
                        })}
                        color='primary'
                      >
                        Add
                      </Button>{' '}
                      <Button onClick={remove.bind(null, index)} color='danger'>
                        Delete
                      </Button>
                    </p>
                  </Col>
                </FormGroup>
              </Fragment>
            );
          })}
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={toggle}
            disabled={loading}
            type='button'
            color='danger'
          >
            Cancel
          </Button>{' '}
          <Button disabled={loading} type='submit' color='success'>
            {loading ? (
              <>
                <Spinner size='sm' /> Submitting...
              </>
            ) : (
              'Ok'
            )}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

UserEditModal.propTypes = {};
UserEditModal.defaultProps = {};

export default UserEditModal;
