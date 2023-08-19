import { ChangeEventHandler, FocusEventHandler } from 'react';
import { Box, useMediaQuery, TextField } from '@mui/material';
import { FormikErrors, FormikTouched, getIn } from 'formik';
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

  const formattedName = (field) => `${type}.${field}`;
  const formattedError = (field) =>
    getIn(touched, formattedName(field)) && Boolean(getIn(errors, formattedName(field)));
  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

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
        name={formattedName('firstName')}
        error={formattedError('firstName')}
        helperText={formattedHelper('firstName')}
        sx={{ gridColumn: 'span 2' }}
      ></TextField>
      <TextField
        fullWidth
        type='text'
        label='Last Name'
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.lastName}
        name={formattedName('lastName')}
        error={formattedError('lastName')}
        helperText={formattedHelper('lastName')}
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
        helperText={formattedHelper('country')}
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
        helperText={formattedHelper('street1')}
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
        helperText={formattedHelper('street2')}
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
        helperText={formattedHelper('city')}
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
        helperText={formattedHelper('state')}
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
        helperText={formattedHelper('postal')}
        sx={{ gridColumn: 'span 1' }}
      ></TextField>
    </Box>
  );
};

export default AddressForm;
