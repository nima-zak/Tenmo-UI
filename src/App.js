import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Exit from "./Exit";
import User from "./User";
import Balance from "./Balance";
import Transfers from "./Transfers";
import Pending from "./Pending";
import SendBucks from "./SendBucks";
import RequestBucks from "./RequestBucks";

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TEnmo
          </Typography>
          <Button color="inherit" href="/register">
            Register
          </Button>
          <Button color="inherit" href="/login">
            Login
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              if (localStorage.getItem("token")) {
                localStorage.removeItem("token");
              }
              window.location.href = "/";
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ marginTop: "2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/balance/:id" element={<Balance />} />
          <Route path="/transfers/:id" element={<Transfers />} />
          <Route path="/requests/:id" element={<Pending />} />
          <Route path="/send-bucks/:id" element={<SendBucks />} />
          <Route path="/requestBucks/:id" element={<RequestBucks />} />
          <Route path="/exit" element={<Exit />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
