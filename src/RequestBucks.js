import { React, useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";


function RequestBucks() {
  const [users, setUsers] = useState([]);
  const [recipientId, setRecipientId] = useState(0);
  const [amount, setAmount] = useState(0);
  const params = useParams();

  useEffect(() => {
    loadRequestBucksPage();
  }, []);

  const loadRequestBucksPage = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await axios.get("http://localhost:8080/user", {
        headers,
      });
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequestBucks = async (event) => {
    event.preventDefault();
    if (recipientId !== 0 && amount !== 0) {
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const recipientAccountResponse = await axios.get(
          `http://localhost:8080/account/user/${recipientId}`,
          { headers }
        );
        const recipientAccount = recipientAccountResponse.data;
        const userAccountResponse = await axios.get(
          `http://localhost:8080/account/user/${params.id}`,
          { headers }
        );
        const userAccount = userAccountResponse.data;

        const transfer = {
          amount,
          userFrom: recipientId,
          userTo: params.id,
          accountTo: userAccount.accountId,
          accountFrom: recipientAccount.accountId,
        };

        const transferResponse = await axios.post(
          "http://localhost:8080/transfer/request",
          transfer,
          { headers }
        );
        alert(transferResponse.data);
        setAmount(0);
        setRecipientId(0);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please complete all required fields.");
    }
  };

  return (
    <div>
      <h1>Request Bucks</h1>
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

      <form onSubmit={handleRequestBucks}>
        <h2>Enter the user ID of the user you are requesting from:</h2>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-user-id">
            User ID:
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-user-id"
            label="UserId"
            type="number"
            value={recipientId}
            onChange={(e) => setRecipientId(parseInt(e.target.value))}
          />
        </FormControl>

        <h2>Enter amount you'd like to request:</h2>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">
            Amount:
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            type="number"
            value={amount}
onChange={(e) => setAmount(parseFloat(e.target.value))}
/>
</FormControl>  
  <br />
    <Button variant="contained" type="submit">Request</Button>
  </form>
</div>
);
}

export default RequestBucks;
