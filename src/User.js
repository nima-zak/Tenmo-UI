import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

function User() {
  useEffect(() => checkToken(), null);
  const params = useParams();

  const checkToken = () => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Welcome to TEnmo Bank
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to={"/balance/" + params.id}
        fullWidth
        sx={{ my: 2 }}
      >
        View your current balance
      </Button>
      <Button
        variant="contained"
        component={Link}
        to={"/transfers/" + params.id}
        fullWidth
        sx={{ my: 2 }}
      >
        View your past transfers
      </Button>
      <Button
        variant="contained"
        component={Link}
        to={"/requests/" + params.id}
        fullWidth
        sx={{ my: 2 }}
      >
        View your pending requests
      </Button>
      <Button
        variant="contained"
        component={Link}
        to={"/send-bucks/" + params.id}
        fullWidth
        sx={{ my: 2 }}
      >
        Send TE bucks
      </Button>
      <Button
        variant="contained"
        component={Link}
        to={"/requestBucks/" + params.id}
        fullWidth
        sx={{ my: 2 }}
      >
        Request TE bucks
      </Button>
      <Button
        variant="contained"
        component={Link}
        to="/"
        fullWidth
        sx={{ my: 2 }}
      >
        Exit
      </Button>
    </Container>
  );
}

export default User;
