import { React, useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

function SendBucks() {
  const [users, setUsers] = useState([]);
  const [recipientId, setRecipientId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [recipientAccount, setRecipientAccount] = useState({});
  const [userAccount, setUserAccount] = useState({});
  const params = useParams();


  useEffect(() => loadSendBucksPage(), []);

  const loadSendBucksPage = () => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    } else {
      getUsers();
    }
  };

  const getUsers = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get("http://localhost:8080/user/", {
        headers,
      })
      .then((res) => {
        setUsers(res.data);
      });
  };

  const handleSendBucks = (event) => {
    event.preventDefault();
    if(!recipientId == 0 && !amount == 0) {
      getRecipientAccount();
      getUserAccount();
      transferAmount();





    } else {
      alert("please complete requested fields")
    }

  };

  const getRecipientAccount = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  
    axios
      .get("http://localhost:8080/account/user/"+ recipientId, {
        headers,
      })
      .then((res) => {
        setRecipientAccount(res.data);
      });
  }

  const getUserAccount = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get("http://localhost:8080/account/user/"+ params.id, {
        headers,
      })
      .then((res) => {
        setUserAccount(res.data);
      });
  }

  const transferAmount = () => {
    const transfer = {
      "amount": amount,
      "userFrom": params.id, 
      "userTo": recipientId, 
      "accountTo": recipientAccount["accountId"], 
      "accountFrom":userAccount["accountId"]}

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  
    axios
      .post("http://localhost:8080/transfer/send/", transfer, {
        headers,
      })
      .then((res) => {
        setAmount(0);
        setRecipientId(0);
        setRecipientAccount({});
        setUserAccount({});
        alert(res.data);
      });
  }

  return (
    <div>
      <h1>Send Bucks</h1>
      <p>LIST OF AVAILABLE USERS</p>
      <table className="table-border">
        <thead>
          <tr>
            <th className="pending-table">ID</th>
            <th className="pending-table">Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="pending-table">{user.id}</td>
              <td className="pending-table">{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSendBucks}>
      <h2>Enter the user ID of the user you are sending to:</h2>            
        <FormControl fullWidth sx={{ m: 1 }}>        
          <InputLabel htmlFor="outlined-adornment-amount">
            user ID :
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-user-id"
            label="UserId"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
          />
        </FormControl>
              <h2>Enter amount you'd like to send:</h2>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">amount : </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormControl>

        <br />
        <Button variant="contained" type="submit">Send</Button>
      </form>
    </div>
  );
}

export default SendBucks;
