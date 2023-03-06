import React from "react";
import { Button } from "@mui/material";

function Exit() {
  const handleExit = () => {
    window.close();
  };

  return (
    <div>
      <Button variant="contained" onClick={() => {
              if (localStorage.getItem("token")) {
                localStorage.removeItem("token");
              }
              window.location.href = "/";
            }}>
        Exit
      </Button>
    </div>
  );
}

export default Exit;
