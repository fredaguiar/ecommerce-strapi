import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import Shipping from './Shipping';
import { Box, Button, Stepper, Step, StepLabel, useTheme } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../state/store';
import { setItems } from '../../state/cartReducer';

const initValues = {
  billingAddress: {
    firstName: '',
    lastName: '',
    street1: '',
    street2: '',
    country: '',
    city: '',
    state: '',
    postal: ''
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: '',
    lastName: '',
    street1: '',
    street2: '',
    country: '',
    city: '',
    state: '',
    postal: ''
  },
  email: '',
  phone: ''
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required('required'),
      lastName: yup.string().required('required'),
      street1: yup.string().required('required'),
      street2: yup.string(),
      country: yup.string().required('required'),
      city: yup.string().required('required'),
      state: yup.string().required('required'),
      postal: yup.string().required('required')
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when('isSameAddress', {
        is: (isSameAddress) => isSameAddress === true,
        then: () => yup.string().required('required')
      }),
      lastName: yup.string().when('isSameAddress', {
        is: (isSameAddress) => isSameAddress === true,
        then: () => yup.string().required('required')
      }),
      street1: yup.string().when('isSameAddress', {
        is: (isSameAddress) => isSameAddress === true,
        then: () => yup.string().required('required')
      }),
      street2: yup.string().when('isSameAddress', {
        is: (isSameAddress) => isSameAddress === true,
        then: () => yup.string()
      }),
      country: yup.string().when('isSameAddress', {
        is: (isSameAddress) => isSameAddress === true,
        then: () => yup.string().required('required')
      }),
      city: yup.string().when('isSameAddress', {
        is: (isSameAddress) => isSameAddress === true,
        then: () => yup.string().required('required')
      }),
      state: yup.string().when('isSameAddress', {
        is: (isSameAddress) => isSameAddress === true,
        then: () => yup.string().required('required')
      }),
      postal: yup.string().when('isSameAddress', {
        is: (isSameAddress) => isSameAddress === true,
        then: () => yup.string().required('required')
      })
    })
  }),
  yup.object().shape({
    email: yup.string().required('required'),
    phone: yup.string().required('required')
  })
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useAppSelector((state) => state.cart.cart);
  const firstStep = activeStep === 0;
  const secondStep = activeStep === 1;

  const handleFormSubmit = async (value, actions) => {
    setActiveStep(activeStep + 1);
  };

  const makePayment = async () => {};

  return (
    <Box width='80%' margin='100% auto'>
      <Stepper>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              {firstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  setFieldValue={setFieldValue}
                />
              )}
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Checkout;
