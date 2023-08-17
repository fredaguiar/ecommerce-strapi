import { FocusEventHandler, ChangeEventHandler, FormEventHandler } from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import AddressForm from './AddressForm';
import { IAddress, IAddressesAll } from '../global/Types';

export interface IShipping {
  values: IAddressesAll;
  errors: FormikErrors<IAddressesAll>;
  touched: FormikTouched<IAddressesAll>;
  handleBlur: FocusEventHandler<HTMLInputElement>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  setFieldValue: any;
}

const Shipping = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue
}: IShipping) => {
  return (
    <Box m='30px auto'>
      {/* Billing form */}
      <Box>
        <Typography sx={{ mb: '15px' }} fontSize='18px'>
          Billing Information
        </Typography>
        <AddressForm
          type='billingAddress'
          values={values.billingAddress}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Box>
      <Box m='20px '>
        <FormControlLabel
          label='Same for Shipping Address'
          control={<Checkbox defaultChecked value={values.shippingAddress.isSameAddress} />}
          onChange={() =>
            setFieldValue('shippingAddress.isSameAddress', !values.shippingAddress.isSameAddress)
          }
        />
      </Box>
      {/* Shipping form*/}
      {!values.shippingAddress.isSameAddress && (
        <Box>
          <Typography sx={{ mb: '15px' }} fontSize='18px'>
            Shipping Information
          </Typography>
          {/* <AddressForm
            type='shippingAddress'
            values={values.shippingAddress}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          /> */}
        </Box>
      )}
    </Box>
  );
};

export default Shipping;
