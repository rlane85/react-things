import { deviceCommand } from "../../sockets/smartthings/emits.js";

import { Button } from "@mui/material";
export const Switch = ({ value, id, attribute }) => {
  const newValue = value === "on" ? "off" : "on";
  return (
    <Button onClick={() => deviceCommand(id, attribute, newValue)}>
      {value}
    </Button>
  );
};
