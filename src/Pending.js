import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function Pending() {
  const [pendings, setpendings] = useState([]);
  useEffect(() => loadPendingPage(), []);
  const params = useParams();

  const loadPendingPage = () => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    } else {
      getpendings();
    }
  };

  const getpendings = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get("http://localhost:8080/transfer/user/" + params.id + "/pending", {
        headers,
      })
      .then((res) => {
        setpendings(res.data);
      });
  };

  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {pendings.map((pendingData , i) => (
          <div key={i}>
            <div className="request-border">
              <h1>pending requests: </h1>
            </div>
            <ListItem
              key="requestId"
              disableGutters
              secondaryAction={<p>{pendingData["requestId"]}</p>}
            >
              <ListItemText primary={"request ID:"} />
            </ListItem>

            <ListItem
              key="userFrom"
              disableGutters
              secondaryAction={<p>{pendingData["userFrom"]}</p>}
            >
              <ListItemText primary={"From User ID:"} />
            </ListItem>

            <ListItem
              key="userTo"
              disableGutters
              secondaryAction={<p>{pendingData["userTo"]}</p>}
            >
              <ListItemText primary={"To User ID:"} />
            </ListItem>

            <ListItem
              key="userFromUsername"
              disableGutters
              secondaryAction={<p>{pendingData["userFromUsername"]}</p>}
            >
              <ListItemText primary={"From User:"} />
            </ListItem>

            <ListItem
              key="userToUsername"
              disableGutters
              secondaryAction={<p>{pendingData["userToUsername"]}</p>}
            >
              <ListItemText primary={"To User:"} />
            </ListItem>

            <ListItem
              key="transferTypeId"
              disableGutters
              secondaryAction={
                <p>
                  {pendingData["transferTypeId"] === 1
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
                  {pendingData["transferStatusId"] === 1
                    ? "pending"
                    : pendingData["transferStatusId"] === 2
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
              secondaryAction={
                pendingData["transferStatusId"] === 1 ? (
                  <p>{pendingData["amount"]}</p>
                ) : null
              }
            >
              <ListItemText primary={"Amount:"} />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
}

export default Pending;
