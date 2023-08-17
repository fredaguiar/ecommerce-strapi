import { Box, TextField, Typography } from '@mui/material';
import { FormikErrors, FormikTouched } from 'formik';
import { ChangeEventHandler, FocusEventHandler } from 'react';
import { IAddress, IAddressesAll } from '../global/Types';

export interface IPayment {
  values: any;
  errors: FormikErrors<IAddressesAll>;
  touched: FormikTouched<IAddressesAll>;
  handleBlur: FocusEventHandler<HTMLInputElement>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

const Payment = ({ values, errors, touched, handleBlur, handleChange }: IPayment) => {
  return (
    <Box m='30px 0'>
      <Box>
        <Typography sx={{ mb: '15px' }} fontSize='18px'>
          Contact Info
        </Typography>
        <TextField
          fullWidth
          type='text'
          label='Email'
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name='email'
          error={!!touched.email && !!errors.email}
          // helperText={touched.email && errors.email}
          sx={{ gridColumn: 'span 4', marginBottom: '15px' }}
        ></TextField>
        <TextField
          fullWidth
          type='text'
          label='Phone'
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phone}
          name='phone'
          error={!!touched.phone && !!errors.phone}
          // helperText={touched.email && errors.email}
          sx={{ gridColumn: 'span 4' }}
        ></TextField>
      </Box>
    </Box>
  );
};

export default Payment;
