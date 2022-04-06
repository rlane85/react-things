import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import { Weather, SmartThings } from "./routes";
import { Device } from "./components/smartThings/Device";
import App from "./App";

export const SocketHandler = () => {
  const [st, setSt] = useState({ devices: { a: {} } });
  const [user, setUser] = useState("Ryan");

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
      updateSt(msg);
    });
	
    return () => {
      stSocket.close();
    };
  }, [user]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="st" element={<SmartThings data={st} />}>
            {Object.keys(st.devices).map((deviceId) => {
              return (
                <Route
                  key={deviceId}
                  path={deviceId}
                  element={<Device device={st.devices[deviceId]} />}
                />
              );
            })}
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
