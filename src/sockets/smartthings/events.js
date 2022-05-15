import { stSocket } from "./index";
import update from "immutability-helper";

export const socketEvents = ({ setStValue }) => {
  stSocket.on("connect", () => {
    stSocket.emit("getConnectionPacket");
    setStValue((prevSt) => {
      const newValue = update(prevSt, {
        connected: { $set: true },
      });
      return newValue;
    });
    console.log("connected to stSocket, requesting connection packet");
  });

  stSocket.on("disconnect", () => {
    console.log("disconnected from stSocket");
    setStValue((prevSt) => {
      const newValue = update(prevSt, {
        connected: { $set: false },
      });
      return newValue;
    });
  });
  stSocket.on("ack", (msg) => {
    const { deviceId, capability } = msg;
    console.log("ack received", msg);
    setStValue((prevSt) => {
      const newValue = update(prevSt, {
        devices: {
          [deviceId]: {
            attributes: { [capability]: { awaitingReply: { $set: true } } },
          },
        },
      });
      return newValue;
    });
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
              [attribute]: {
                value: { $set: value },
                awaitingReply: { $set: false },
              },
            },
          },
        },
      });
      return newValue;
    });
  });
};
