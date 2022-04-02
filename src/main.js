import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import { Weather, SmartThings } from "./routes";
import { Device } from "./components/smartThings/Device";
import App from "./App";

export const SocketHandler = () => {
  const [st, setSt] = useState({ devices: { a: {} } });
  const [pws, setPws] = useState(false);
  const [user, setUser] = useState("Ryan");

  const updatePws = (msg) => {
    setPws((pws) => ({
      ...pws,
      ...msg,
    }));
  };
  const updateSt = (msg) => {
    setSt((st) => ({
      ...st,
      ...msg,
    }));
  };

  useEffect(() => {
    const pwsSocket = io(
      process.env.REACT_APP_PWS_SOCKET_DOMAIN + "/pwsSocket",
      {
        forceNew: true,
        path: "/pwsSocket",
        transports: ["websocket", "polling"],
      }
    );

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
    pwsSocket.on("connectionError", (err) => {
      console.log("🚀 ~ file: App.js ~ line 42 ~ pwsSocket.on ~ err", err);
    });
    pwsSocket.on("connect", () => {
      console.log("connected to pwsSocket");
    });

    pwsSocket.on("disconnect", () => {
      console.log("disconnected from pwsSocket");
    });

    pwsSocket.on("data", (msg) => {
      updatePws(msg);
    });

    return () => {
      pwsSocket.close();
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
          <Route path="pws" element={<Weather data={pws} />} />
        </Route>
      </Routes>
    </div>
  );
};
