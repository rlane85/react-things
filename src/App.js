import React, { useEffect, useState } from "react";
import io from "socket.io-client";
// import Messages from './Messages';
// import MessageInput from './MessageInput';

// import "./App.css";

function App() {
  const [pws, setPws] = useState({
    connected: false,
    epoch: { value: false },
  });

  const [st, setSt] = useState({
    connected: false,
  });

  const [user, setUser] = useState("Ryan");

  useEffect(() => {
    const pwsSocket = io(process.env.REACT_APP_PWS_SOCKET_DOMAIN + "/pushSocket");

    const stSocket = io(process.env.REACT_APP_ST_SOCKET_DOMAIN + "/stSocket", {
      forceNew: true,
      path: "/stSocket",
      transports: ["websocket", "polling"],
    });
    
console.log(`${JSON.stringify(process.env, null, 1)} process.env App.js`)
    stSocket.emit("getConnectionPacket", user);
    stSocket.on("connect", () => {
      console.log("connected to stSocket");
    });
    stSocket.on("connectionPacket", (msg) => {
      console.log("🚀 ~ file: App.js ~ line 32 ~ newStSocket.on ~ msg", msg);
      setSt({
        ...st,
        ...msg,
      });
    });

    pwsSocket.on("connectionError", (err) => {
      console.log("🚀 ~ file: App.js ~ line 42 ~ pwsSocket.on ~ err", err);
    });
    pwsSocket.on("connect", () => {
      console.log("connected to pwsSocket");
      setPws({
        ...pws,
        connected: true,
      });
    });
    pwsSocket.on("disconnect", () => {
      console.log("disconnected from pwsSocket");
    });
    pwsSocket.on("rapidWind", (msg) => {
      setPws({
        ...pws,
        ...msg,
      });
    });
    pwsSocket.on("packetObject", (msg) => {
      setPws({
        ...pws,
        ...msg,
      });
    });

    return () => {
      pwsSocket.close();
      stSocket.close();
    };
  }, []);

  return (
    <div className="App">
      {pws.epoch.value ? pws.epoch.value : "not connected"}
    </div>
  );
}

export default App;
