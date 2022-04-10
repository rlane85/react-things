import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { SmartThings } from "../components/SmartThings";
import update from "immutability-helper";

export const StSocketService = ({ userContent }) => {
  const [st, setSt] = useState({ ...userContent });

  useEffect(() => {
    const stSocket = io(process.env.REACT_APP_ST_SOCKET_DOMAIN + "/stSocket", {
      forceNew: true,
      path: "/stSocket",
      transports: ["websocket", "polling"],
    });

    stSocket.on("connect", () => {
      stSocket.emit("getConnectionPacket");
      console.log("connected to stSocket, requesting connection packet");
    });

    stSocket.on("disconnect", () => {
      console.log("disconnected from stSocket");
    });

    stSocket.on("connectionPacket", (msg) => {
      setSt((prevSt) => {
        const newValue = update(prevSt, { devices: { $set: msg.devices } });
        return newValue;
      });
    });

    stSocket.on("event", (msg) => {
      setSt((prevSt) => {
        const deviceId = msg.id;
        const attribute = Object.keys(msg.value)[0];
        const value = msg.value[attribute];
        const newValue = update(prevSt, {
          devices: {
            [deviceId]: {
              attributes: { [attribute]: { value: { $set: value } } },
            },
          },
        });
        return newValue;
      });
    });

    return () => {
      stSocket.close();
    };
  }, []);
  return st.devices ? <SmartThings data={st} /> : <p>Loading...</p>;
};
