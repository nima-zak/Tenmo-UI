import React from "react";
import { Button } from "@mui/material";

function Exit() {
  const handleExit = () => {
    window.close();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleExit}>
        Exit
      </Button>
    </div>
  );
}

export default Exit;
