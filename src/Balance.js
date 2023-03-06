import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Balance() {
  const [balance, setBalance] = useState(0);
  useEffect(() => loadBalancePage(), null);
  const params = useParams();

  const loadBalancePage = () => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    } else {
      getBalance();
    }
  };

  const getBalance = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get("http://localhost:8080/account/user/" + params.id + "/balance", {
        headers,
      })
      .then((res) => setBalance(res.data));
  };

  return (
    <div>
      <h1>Your current account balance is: $ {balance}</h1>
      
    </div>
  );
}

export default Balance;
