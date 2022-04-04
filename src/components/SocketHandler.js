import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import io from "socket.io-client";
import { Weather, SmartThings } from "./";
import { Device } from "./smartThings/Device";

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
        <Route path="*">
          <Route path="st/*" element={<SmartThings data={st} />} />

          <Route path="pws" element={<Weather data={pws} />} />
        </Route>
      </Routes>

      <p>
        <Link to="/">Home</Link>
      </p>

      <p>
        <Link to="/st">SmartThings</Link>
      </p>

      <p>
        <Link to="/pws">Personal Weather</Link>
      </p>
    </div>
  );
};
