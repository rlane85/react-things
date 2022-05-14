import { stSocket } from "./index";
export const deviceCommand = (deviceId, capability, command, args) => {
  console.log("%cemits.js line:3 command", "color: #007acc;", command);
  stSocket.emit("deviceCommand", {
    device: deviceId,
    capability: capability,
    command: command,
  });
};
