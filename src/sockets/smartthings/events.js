import { stSocket } from "./index";
import update from "immutability-helper";

export const socketEvents = ({ setStValue }) => {
  stSocket.on("connect", () => {
    stSocket.emit("getConnectionPacket");
    console.log("connected to stSocket, requesting connection packet");
  });

  stSocket.on("disconnect", () => {
    console.log("disconnected from stSocket");
  });
  stSocket.on("ack", () => {
    console.log("ack received");
  });
  stSocket.on("finish", () => {
    console.log("finish received");
  });

  stSocket.on("connectionPacket", (msg) => {
    setStValue((prevSt) => {
      const newValue = update(prevSt, { devices: { $set: msg.devices } });
      return newValue;
    });
  });

  stSocket.on("event", (msg) => {
    setStValue((prevSt) => {
      const deviceId = msg.id;
      const attribute = Object.keys(msg.value)[0];
      const value = msg.value[attribute];

      const newValue = update(prevSt, {
        devices: {
          [deviceId]: {
            attributes: {
              [attribute]: { value: { $set: value } },
            },
          },
        },
      });
      return newValue;
    });
  });
};
