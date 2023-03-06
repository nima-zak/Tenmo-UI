import React, { useState } from "react";
import axios from "axios";
import { Button, Container, TextField, Typography } from "@mui/material";
import user from "./User";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      alert("Username and password cannot be empty.");
      return;
    }

    axios
      .post("http://localhost:8080/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          // Redirect to the CustomerHome page
          window.location.href = `/user/${response.data.user.id}`;
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Username or password is not correct.");
      });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Please Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;
