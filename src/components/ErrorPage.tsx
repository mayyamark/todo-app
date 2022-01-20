import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

const ErrorPage = () => (
  <Box 
    sx={{ 
      margin: 6 // 48px
    }}
  >
    <Typography 
      variant="h1"
      sx={{
        color: 'error.dark'
      }}
    >
      An error has occurred!
    </Typography>
  </Box>
);

export default ErrorPage;