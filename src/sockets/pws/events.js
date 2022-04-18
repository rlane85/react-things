import { pwsSocket } from "./index";
export const socketEvents = ({ setPwsValue }) => {
  pwsSocket.on("connectionError", (err) => {
    console.log(err);
  });
  pwsSocket.on("connect", () => {
    console.log("connected to pwsSocket");
  });

  pwsSocket.on("disconnect", () => {
    console.log("disconnected from pwsSocket");
  });

  pwsSocket.on("data", (msg) => {
    setPwsValue((state) => {
      return { pws: { ...state.pws, ...msg } };
    });
  });
};
