import { Box, Alert, AlertTitle } from '@mui/material';

const NotFound = () => {
  return (
    <Box m='90px auto' width='80%' height='50vh'>
      <Alert severity='error'>
        <AlertTitle>404 Page not found</AlertTitle>
      </Alert>
    </Box>
  );
};

export default NotFound;
