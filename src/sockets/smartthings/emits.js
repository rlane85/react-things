import { stSocket } from "./index";
export const deviceCommand = (deviceId, capability, command, args) => {
  stSocket.emit("deviceCommand", {
    deviceId: deviceId,
    capability: capability,
    command: command,
    args: args,
  });
};
