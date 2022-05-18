import io from "socket.io-client";
import { socketEvents } from "./events";

export const stSocket = io(
  process.env.REACT_APP_ST_SOCKET_DOMAIN + "/stSocket",
  {
    path: "/stSocket",
    transports: ["websocket", "polling"],
  }
);
export const initSockets = (setStValue, connected) => {
  socketEvents(setStValue);
  if (!connected) {
    // console.log("%cindex.js line:14 connected", "color: #007acc;", connected);
    stSocket.connect();
  }

  // console.log(stSocket);
};
