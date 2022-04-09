import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { SmartThings } from "../routes";
import update from "immutability-helper";

export const StSocketService = ({ userContent }) => {
  const [st, setSt] = useState({ ...userContent });

  const updateSt = (msg) => {
    const deviceId = msg.id;
    const attribute = Object.keys(msg.value)[0];
    const value = msg.value[attribute];
    const newSt = update(st, {
      devices: { [deviceId]: { [attribute]: { $set: value } } },
    });
    setSt(newSt);
  };
  const handleConnectionPacket = (msg) => {
    const newSt = update(st, {
      devices: { $set: msg.devices },
    });
    return setSt(newSt);
  };

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
      handleConnectionPacket(msg);
      console.log("%cst-socket.service.js line:46 st", "color: #007acc;", st);
    });

    stSocket.on("event", (msg) => {
      updateSt(msg);
      console.log("%cst-socket.service.js line:51 st", "color: #007acc;", st);
    });

    return () => {
      stSocket.close();
    };
  }, []);
  return st.devices ? <SmartThings data={st} /> : <p>Loading...</p>;
};
