import { ChangeEventHandler, FocusEventHandler } from 'react';
import { Box, useMediaQuery, TextField } from '@mui/material';
import { getIn, FormikErrors, FormikTouched } from 'formik';
import { IAddress, IAddressesAll } from '../global/Types';

export interface IAddressForm {
  type: string;
  values: IAddress;
  errors: FormikErrors<IAddressesAll>;
  touched: FormikTouched<IAddressesAll>;
  handleBlur: FocusEventHandler<HTMLInputElement>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

const AddressForm = ({ type, values, errors, touched, handleBlur, handleChange }: IAddressForm) => {
  const isNonMobile = useMediaQuery('(min-width: 600px)');

  const formattedName = (field) => {
    return `${type}.${field}`;
  };
  // const formattedError = (field) => {
  //   console.log(
  //     '🚀 ~ file: AddressForm.tsx:23 ~ formattedError ~ touched firstName:',
  //     touched[formattedName('firstName')]
  //   );
  //   console.log(
  //     '🚀 ~ file: AddressForm.tsx:23 ~ formattedError ~ errors firstName:',
  //     errors[formattedName('firstName')]
  //   );
  //   return touched.firstName && Boolean(errors.firstName);
  // };
  // const formattedHelper = (field) =>
  //   getIn(touched, formattedName(field) && getIn(errors, formattedName(field)));

  console.log('TOUCHED', touched);
  console.log('VALUES', values);
  console.log('ERRORS', errors);
  console.log('touched.billingAddress?.firstName', touched.billingAddress?.firstName);
  console.log(
    'getIn(touched, billingAddress.firstName)',
    getIn(touched, 'billingAddress.firstName')
  );
  // console.log('errors.firstName', errors.firstName);
  console.log('getIn(errors, firstName)', getIn(errors, 'firstName'));
  console.log('errors.billingAddress.firstName', errors.billingAddress?.firstName);
  console.log('errors.billingAddress.firstName', getIn(errors, 'billingAddress.firstName'));

  return (
    <Box
      display='grid'
      gap='15px'
      gridTemplateColumns='repeat(4, minmax(0, 1fr))'
      sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' } }}
    >
      <TextField
        fullWidth
        type='text'
        label='First Name'
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
        name='billingAddress.firstName'
        // error={formattedError('firstName')}
        error={touched.billingAddress?.firstName && Boolean(errors?.billingAddress?.firstName)}
        helperText={touched.billingAddress?.firstName ? errors?.billingAddress?.firstName : ''}
        sx={{ gridColumn: 'span 2' }}
      ></TextField>
      {/* <TextField
        fullWidth
        type='text'
        label='Last Name'
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.lastName}
        name={formattedName('lastName')}
        error={formattedError('lastName')}
        // helperText={formattedHelper('lastName')}
        sx={{ gridColumn: 'span 2' }}
      ></TextField>
      <TextField
        fullWidth
        type='text'
        label='Country'
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.country}
        name={formattedName('country')}
        error={formattedError('country')}
        // helperText={formattedHelper('country')}
        sx={{ gridColumn: 'span 4' }}
      ></TextField>
      <TextField
        fullWidth
        type='text'
        label='Street Address 1'
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.street1}
        name={formattedName('street1')}
        error={formattedError('street1')}
        // helperText={formattedHelper('street1')}
        sx={{ gridColumn: 'span 2' }}
      ></TextField>
      <TextField
        fullWidth
        type='text'
        label='Street Address 2'
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.street2}
        name={formattedName('street2')}
        error={formattedError('street2')}
        // helperText={formattedHelper('street2')}
        sx={{ gridColumn: 'span 2' }}
      ></TextField>
      <TextField
        fullWidth
        type='text'
        label='City'
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.city}
        name={formattedName('city')}
        error={formattedError('city')}
        // helperText={formattedHelper('city')}
        sx={{ gridColumn: 'span 2' }}
      ></TextField>
      <TextField
        fullWidth
        type='text'
        label='State'
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.state}
        name={formattedName('state')}
        error={formattedError('state')}
        // helperText={formattedHelper('state')}
        sx={{ gridColumn: 'span 1' }}
      ></TextField>
      <TextField
        fullWidth
        type='text'
        label='Postal/Zip Code'
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.postal}
        name={formattedName('postal')}
        error={formattedError('postal')}
        // helperText={formattedHelper('postal')}
        sx={{ gridColumn: 'span 1' }}
      ></TextField> */}
    </Box>
  );
};

export default AddressForm;
