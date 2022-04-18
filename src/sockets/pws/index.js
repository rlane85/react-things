import io from "socket.io-client";
import { socketEvents } from "./events";
export const pwsSocket = io(
  process.env.REACT_APP_PWS_SOCKET_DOMAIN + "/pwsSocket",
  {
    forceNew: true,
    path: "/pwsSocket",
    transports: ["websocket", "polling"],
  }
);
export const initSockets = ({ setPwsValue }) => {
  socketEvents({ setPwsValue });
};
