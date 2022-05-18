import { stSocket } from "./index";
export const deviceCommand = (deviceId, attribute, args) => {
  stSocket.emit("deviceCommand", {
    deviceId: deviceId,
    attribute: attribute,

    args: args,
  });
};
