import React, { Fragment, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Formik,
  Field,
  Form,
  useFormikContext,
  ErrorMessage,
  FieldArray,
} from 'formik';
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  FormFeedback,
} from 'reactstrap';
import * as yup from 'yup';

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
  options: yup.string().trim().required('Options is Required'),
  address: yup.object().shape({
    street: yup
      .string()
      .trim()
      .test('random', "Doesn't matter", (value, context) => {
        console.log('context: ', context);
        return true;
      }),
  }),
  friends: yup.array().of(
    yup.object().shape({
      name: yup.string().trim().required('A friends name is required'),
    })
  ),
});

const UserEditComponent = ({ user = {} }) => {
  const initialValues = useMemo(() => {
    return {
      ...user,
      options: 'green',
      friends: [{ name: 'Marcus' }],
    };
  }, [user]);
  return (
    <>
      <Formik
        {...{ initialValues }}
        onSubmit={values => {
          console.log('values: ', values);
        }}
        validationSchema={schema}
      >
        {() => {
          return (
            <>
              <RenderedForm />
            </>
          );
        }}
      </Formik>
    </>
  );
};

function RenderedForm() {
  const {
    handleSubmit,
    values,
    setFieldValue,
    errors,
    isValid,
    ...formStuff
  } = useFormikContext();
  const { options } = values;
  // console.log('formStuff: ', formStuff);

  return (
    <>
      <Form>
        <Row className='justify-content-center'>
          <Col sm={4}>
            <FormGroup>
              <Label htmlFor='name'>Name</Label>
              <Field valid={!errors.name} name='name'>
                {({ field, meta: { error } }) => {
                  return (
                    <>
                      <Input invalid={!!error} {...field} />
                    </>
                  );
                }}
              </Field>
              <ErrorMessage name='name' component={FormFeedback} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='username'>Username</Label>
              <Field valid={!errors.name} name='username'>
                {({ field, meta: { error } }) => {
                  return (
                    <>
                      <Input invalid={!!error} {...field} />
                    </>
                  );
                }}
              </Field>
              <ErrorMessage name='username' component={FormFeedback} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='email'>Email</Label>
              <Field valid={!errors.name} name='email'>
                {({ field, meta: { error } }) => {
                  return (
                    <>
                      <Input invalid={!!error} {...field} />
                    </>
                  );
                }}
              </Field>
              <ErrorMessage name='email' component={FormFeedback} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='website'>Website</Label>
              <Field valid={!errors.name} name='website'>
                {({ field, meta: { error } }) => {
                  return (
                    <>
                      <Input invalid={!!error} {...field} />
                    </>
                  );
                }}
              </Field>
              <ErrorMessage name='website' component={FormFeedback} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='options'>Options</Label>
              <Field name='options'>
                {({ field, meta: { error } }) => {
                  return (
                    <>
                      <Input invalid={!!error} type='select' {...field}>
                        <option value=''>Select</option>
                        <option value='orange'>Orange</option>
                        <option value='blue'>Blue</option>
                        <option value='green'>Green</option>
                      </Input>
                    </>
                  );
                }}
              </Field>
              <ErrorMessage name='options' component={FormFeedback} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='address.street'>Street</Label>
              <Field name='address.street'>
                {({ field, meta: { error } }) => {
                  return (
                    <>
                      <Input invalid={!!error} {...field} />
                    </>
                  );
                }}
              </Field>
              <ErrorMessage name='address.street' component={FormFeedback} />
            </FormGroup>
            <FieldArray name='friends'>
              {({ push, remove }) => {
                return (
                  <>
                    {values?.friends &&
                      !!values?.friends?.length &&
                      values.friends.map((field, index) => {
                        return (
                          <Fragment key={index}>
                            <FormGroup>
                              <Label htmlFor={`friends[${index}].name`}>
                                Friend Name
                              </Label>
                              <Field name={`friends[${index}].name`}>
                                {({ field, meta: { error } }) => {
                                  return (
                                    <>
                                      <Input
                                        id={`friends[${index}].name`}
                                        invalid={!!error}
                                        {...field}
                                      />
                                      <ErrorMessage
                                        name={`friends[${index}].name`}
                                        component={FormFeedback}
                                      />
                                      <p className='mt-2'>
                                        <Button
                                          onClick={push.bind(null, {
                                            name: '',
                                          })}
                                          color='primary'
                                        >
                                          Add
                                        </Button>{' '}
                                        <Button
                                          onClick={remove.bind(null, index)}
                                          color='danger'
                                        >
                                          Delete
                                        </Button>
                                      </p>
                                    </>
                                  );
                                }}
                              </Field>
                            </FormGroup>
                          </Fragment>
                        );
                      })}
                  </>
                );
              }}
            </FieldArray>
          </Col>
          <div className='w-100' />
          <Col sm={4}>
            <Button color='success'>Submit</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

UserEditComponent.propTypes = {};
UserEditComponent.defaultProps = {};

export default UserEditComponent;
