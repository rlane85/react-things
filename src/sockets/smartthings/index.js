import io from "socket.io-client";
import { socketEvents } from "./events";

export const stSocket = io(
  process.env.REACT_APP_ST_SOCKET_DOMAIN + "/stSocket",
  {
    forceNew: true,
    path: "/stSocket",
    transports: ["websocket", "polling"],
  }
);
export const initSockets = ({ setStValue }) => {
  socketEvents({ setStValue });
};
