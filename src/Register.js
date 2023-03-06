import { React, useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === confirmPass) {
      axios
        .post("http://localhost:8080/register", {
          username: username,
          password: password,
        })
        .then((data) => console.log(data));
      alert("Registration successful. You can now login.");
    } else {
      alert("Password is not match");
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmedPassChange = (event) => {
    setConfirmPass(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" gutterBottom>

      
        Please register a new user account
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
        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          type="password"
          value={confirmPass}
          onChange={handleConfirmedPassChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </form>
    </Container>
  );
}

export default Register;
