import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import AddressForm from './AddressForm';
const Shipping = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue
}) => {
  return (
    <Box m='30px auto'>
      {/* Billing form */}
      <Box>
        <Typography sx={{ mt: '15px' }}>Billing Information</Typography>
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
          <Typography sx={{ mt: '15px' }} fontSize='18px'>
            Shipping Information
          </Typography>
          <AddressForm
            type='shippingAddress'
            values={values.shippingAddress}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default Shipping;
