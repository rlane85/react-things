import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { SmartThings } from "../routes";

export const StSocketService = ({user}) => {
	  const [st, setSt] = useState({ devices: { a: {} } });

  const updateSt = (msg) => {
    setSt((st) => ({
      ...st,
      ...msg,
    }));
  };

  useEffect(() => {
    const stSocket = io(process.env.REACT_APP_ST_SOCKET_DOMAIN + "/stSocket", {
      forceNew: true,
      path: "/stSocket",
      transports: ["websocket", "polling"],
    });

    stSocket.on("connect", () => {
      stSocket.emit("getConnectionPacket", user);
      console.log("connected to stSocket, requesting connection packet");
    });

    stSocket.on("disconnect", () => {
      console.log("disconnected from stSocket");
    });
    stSocket.on("connectionPacket", (msg) => {
      updateSt(msg);
    });
    stSocket.on("event", (msg) => {
		console.log(msg)
      updateSt(msg);
    });

    return () => {
      stSocket.close();
    };
  }, [user]);
  return <SmartThings data={st} />;
}