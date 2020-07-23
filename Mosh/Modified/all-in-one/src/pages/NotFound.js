import React from "react";
import { Typography, Box } from "@material-ui/core";

const NotFound = (props) => {
  return (
    <Box
      width={1}
      height="calc(100vh - 64px)"
      alignItems="center"
      display="flex"
      justifyContent="center"
    >
      <Typography variant="h1" component="h2" align="center">
        This Page Not Found
      </Typography>
    </Box>
  );
};

export default NotFound;
