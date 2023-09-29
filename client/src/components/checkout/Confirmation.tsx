import { useNavigate } from "react-router-dom";
import { Box, Alert, AlertTitle, IconButton, Typography } from "@mui/material";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { shades } from "../../theme";

const Confirmation = () => {
  const navigate = useNavigate();
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        <strong>Your order has been placed!</strong>
      </Alert>
      <IconButton onClick={() => navigate("/")}>
        {/* <ChevronLeftIcon /> */}
        <Typography variant="h4" fontWeight="bold" color={shades.secondary}>
          Back to Store
        </Typography>
      </IconButton>
    </Box>
  );
};

export default Confirmation;
