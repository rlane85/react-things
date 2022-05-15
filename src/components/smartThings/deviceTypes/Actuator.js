import { deviceCommand } from "../../../sockets/smartthings/emits.js";

import { Switch } from "@mui/material";
export const Actuator = ({ value, id, attribute, awaitingReply }) => {
  const newValue = value === "on" ? "off" : "on";
  const checked = value === "on" ? true : false;
  return (
    <Switch
      disabled={awaitingReply}
      checked={value === "on"}
      onClick={() => deviceCommand(id, attribute, newValue)}
    />
  );
};
