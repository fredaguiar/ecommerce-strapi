import { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import * as yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import Shipping from "./Shipping";
import Payment from "./Payment";
import { makePayment } from "../../api/stripeApi";
import { useAppSelector } from "../../state/store";
import { IAddressesAll } from "../global/Types";
import { shades } from "../../theme";
import { red } from "@mui/material/colors";
// import ccinfo from "";

const initValues: IAddressesAll = {
  billingAddress: {
    firstName: "",
    lastName: "",
    street1: "",
    street2: "",
    country: "",
    city: "",
    state: "",
    postal: "",
  },
  shippingAddress: {
    firstName: "",
    lastName: "",
    street1: "",
    street2: "",
    country: "",
    city: "",
    state: "",
    postal: "",
    isSameAddress: true,
  },
  email: "",
  phone: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
      street1: yup.string().required("Required"),
      street2: yup.string(),
      country: yup.string().required("Required"),
      city: yup.string().required("Required"),
      state: yup.string().required("Required"),
      postal: yup.string().required("Required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: (isSameAddress: boolean) => !isSameAddress,
        then: () => yup.string().required("Required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: (isSameAddress: boolean) => !isSameAddress,
        then: () => yup.string().required("Required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: (isSameAddress: boolean) => !isSameAddress,
        then: () => yup.string().required("Required"),
      }),
      street2: yup.string().when("isSameAddress", {
        is: (isSameAddress: boolean) => !isSameAddress,
        then: () => yup.string(),
      }),
      country: yup.string().when("isSameAddress", {
        is: (isSameAddress: boolean) => !isSameAddress,
        then: () => yup.string().required("Required"),
      }),
      city: yup.string().when("isSameAddress", {
        is: (isSameAddress: boolean) => !isSameAddress,
        then: () => yup.string().required("Required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: (isSameAddress: boolean) => !isSameAddress,
        then: () => yup.string().required("Required"),
      }),
      postal: yup.string().when("isSameAddress", {
        is: (isSameAddress: boolean) => !isSameAddress,
        then: () => yup.string().required("Required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().email("Enter a valid email").required("Required"),
    phone: yup.string().required("Required"),
  }),
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const firstStep = activeStep === 0;
  const secondStep = activeStep === 1;
  const thirdStep = activeStep === 2;
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const handleFormSubmit = (
    values: IAddressesAll,
    actions: FormikHelpers<IAddressesAll>
  ) => {
    setActiveStep(activeStep + 1);

    // copy billing address to shipping address
    if (firstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (secondStep) {
      makePayment(values, cartItems);
    }

    actions.setTouched({});
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: checkoutSchema[activeStep],
    onSubmit: handleFormSubmit,
  });

  if (thirdStep) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        width="80%"
        margin="100px auto"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box width="80%" margin="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
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
          <Box display="flex" justifyContent="space-between" gap="50px">
            {secondStep && (
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => setActiveStep(activeStep - 1)}
                sx={{
                  backgroundColor: shades.primary[200],
                  boxShadow: "none",
                  borderRadius: 0,
                  padding: "15px 40px",
                  color: "white",
                  ":hover": {
                    bgcolor: "#cccccc",
                    color: "white",
                  },
                }}
              >
                Back
              </Button>
            )}
            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              sx={{
                backgroundColor: shades.primary[400],
                boxShadow: "none",
                borderRadius: 0,
                padding: "15px 40px",
                color: "white",
                ":hover": {
                  bgcolor: "#cccccc",
                  color: "white",
                },
              }}
            >
              {firstStep && "Next"}
              {secondStep && "Place Order"}
            </Button>
          </Box>
          {secondStep && (
            <div>
              <Box display="flex" justifyContent="flex-end" mt="5px">
                NEXT PAGE USE CARD# &nbsp;<strong>4242424242424242</strong>
              </Box>
              <Box display="flex" justifyContent="flex-end" mt="5px">
                Enter a credit card date in the future
              </Box>
              <Box display="flex" justifyContent="flex-end" mt="5px">
                All the other credit card info, enter &nbsp;<strong> 1</strong>
              </Box>
              {/* <Box display="flex" justifyContent="flex-end" mt="5px"></Box> */}
            </div>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default Checkout;
