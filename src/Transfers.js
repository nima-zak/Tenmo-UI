import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

function Transfers() {
  const [transfers, setTransfers] = useState([]);
  useEffect(() => loadTransferPage(), []);
  const params = useParams();

  const loadTransferPage = () => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    } else {
      getTransfers();
    }
  };

  const getTransfers = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get("http://localhost:8080/transfer/user/" + params.id, {
        headers,
      })
      .then((res) => {
        console.log(res.data);
        setTransfers(res.data);
      });
  };
  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {transfers.map((transferData , i) => (
          <div className="transfer-list" key={i}>
            <div className="transfer-border">
              <h1>Transfer Details: </h1>
            </div>
            <ListItem
              key="transferId"
              disableGutters
              secondaryAction={<p>{transferData["transferId"]}</p>}
            >
              <ListItemText primary={"Transfer ID:"} />
            </ListItem>

            <ListItem
              key="userFrom"
              disableGutters
              secondaryAction={<p>{transferData["userFrom"]}</p>}
            >
              <ListItemText primary={"From User ID:"} />
            </ListItem>

            <ListItem
              key="userTo"
              disableGutters
              secondaryAction={<p>{transferData["userTo"]}</p>}
            >
              <ListItemText primary={"To User ID:"} />
            </ListItem>

            <ListItem
              key="userFromUsername"
              disableGutters
              secondaryAction={<p>{transferData["userFromUsername"]}</p>}
            >
              <ListItemText primary={"From User:"} />
            </ListItem>

            <ListItem
              key="userToUsername"
              disableGutters
              secondaryAction={<p>{transferData["userToUsername"]}</p>}
            >
              <ListItemText primary={"To User:"} />
            </ListItem>

            <ListItem
              key="transferTypeId"
              disableGutters
              secondaryAction={
                <p>
                  {transferData["transferTypeId"] === 1
                    ? "Request Money"
                    : "Send Money"}
                </p>
              }
            >
              <ListItemText primary={"Type:"} />
            </ListItem>

            <ListItem
              key="transferStatusId"
              disableGutters
              secondaryAction={
                <p>
                  {transferData["transferStatusId"] === 1
                    ? "Pending"
                    : transferData["transferStatusId"] === 2
                    ? "Approved"
                    : "Rejected"}
                </p>
              }
            >
              <ListItemText primary={"Status:"} />
            </ListItem>

            <ListItem
              key="amount"
              disableGutters
              secondaryAction={<p>{transferData["amount"]}</p>}
            >
              <ListItemText primary={"Amount:"} />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
}

export default Transfers;
