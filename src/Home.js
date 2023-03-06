import React from "react";
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";

function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}>
  <Button variant="contained" component={Link} to="/register" sx={{ minWidth: "150px", mb: 2 }}>
    Register
  </Button>
  <Button variant="contained" component={Link} to="/login" sx={{ minWidth: "150px", mb: 2 }}>
     Login     
  </Button>
  <Button variant="contained" component={Link} to="/exit" sx={{ minWidth: "150px" }}>
    Exit
  </Button>
</Box>

  );
}

export default Home;
