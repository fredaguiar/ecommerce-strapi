import { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Shipping from './Shipping';
import Payment from './Payment';
import { makePayment } from '../../api/stripe';
import { useAppSelector } from '../../state/store';
import { IAddressesAll } from '../global/Types';
import { shades } from '../../theme';

const initValues: IAddressesAll = {
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
    firstName: '',
    lastName: '',
    street1: '',
    street2: '',
    country: '',
    city: '',
    state: '',
    postal: '',
    isSameAddress: true
  },
  email: '',
  phone: ''
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required('Required'),
      lastName: yup.string().required('Required'),
      street1: yup.string().required('Required'),
      street2: yup.string(),
      country: yup.string().required('Required'),
      city: yup.string().required('Required'),
      state: yup.string().required('Required'),
      postal: yup.string().required('Required')
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when('isSameAddress', {
        is: (isSameAddress) => !isSameAddress,
        then: () => yup.string().required('Required')
      }),
      lastName: yup.string().when('isSameAddress', {
        is: (isSameAddress) => !isSameAddress,
        then: () => yup.string().required('Required')
      }),
      street1: yup.string().when('isSameAddress', {
        is: (isSameAddress) => !isSameAddress,
        then: () => yup.string().required('Required')
      }),
      street2: yup.string().when('isSameAddress', {
        is: (isSameAddress) => !isSameAddress,
        then: () => yup.string()
      }),
      country: yup.string().when('isSameAddress', {
        is: (isSameAddress) => !isSameAddress,
        then: () => yup.string().required('Required')
      }),
      city: yup.string().when('isSameAddress', {
        is: (isSameAddress) => !isSameAddress,
        then: () => yup.string().required('Required')
      }),
      state: yup.string().when('isSameAddress', {
        is: (isSameAddress) => !isSameAddress,
        then: () => yup.string().required('Required')
      }),
      postal: yup.string().when('isSameAddress', {
        is: (isSameAddress) => !isSameAddress,
        then: () => yup.string().required('Required')
      })
    })
  }),
  yup.object().shape({
    email: yup.string().email('Enter a valid email').required('Required'),
    phone: yup.string().required('Required')
  })
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const firstStep = activeStep === 0;
  console.log('🚀 ~ file: Checkout.tsx:96 ~ Checkout ~ activeStep:', activeStep);
  const secondStep = activeStep === 1;

  const handleFormSubmit = (values, actions) => {
    setActiveStep(activeStep + 1);

    // copy billing address to shipping address
    if (firstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue('shippingAddress', {
        ...values.billingAddress,
        isSameAddress: true
      });
    }

    if (secondStep) {
      const items = useAppSelector((state) => state.cart.items);
      makePayment(values, items);
    }

    actions.setTouched({});
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: checkoutSchema[activeStep],
    onSubmit: handleFormSubmit
  });

  return (
    <Box width='80%' margin='100px auto'>
      <Stepper activeStep={activeStep} sx={{ m: '20px 0' }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          {firstStep && (
            <Shipping
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              setFieldValue={formik.setFieldValue}
            />
          )}
          {secondStep && (
            <Payment
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
            />
          )}
          <Box display='flex' justifyContent='space-between' gap='50px'>
            {secondStep && (
              <Button
                fullWidth
                color='primary'
                variant='contained'
                onClick={() => setActiveStep(activeStep - 1)}
                sx={{
                  backgroundColor: shades.primary[200],
                  boxShadow: 'none',
                  borderRadius: 0,
                  padding: '15px 40px',
                  color: 'white',
                  ':hover': {
                    bgcolor: '#cccccc',
                    color: 'white'
                  }
                }}
              >
                Back
              </Button>
            )}
            <Button
              fullWidth
              type='submit'
              color='primary'
              variant='contained'
              sx={{
                backgroundColor: shades.primary[400],
                boxShadow: 'none',
                borderRadius: 0,
                padding: '15px 40px',
                color: 'white',
                ':hover': {
                  bgcolor: '#cccccc',
                  color: 'white'
                }
              }}
            >
              {firstStep ? 'Next' : 'Place Order'}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Checkout;
