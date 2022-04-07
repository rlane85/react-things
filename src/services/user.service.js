import axios from "axios";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import authHeader from "./auth-header";
import { Weather, SmartThings } from "../routes"

const API_URL = process.env.REACT_APP_AUTH_DOMAIN +  "/api/";

const PublicContent = () => {
  const [pws, setPws] = useState(false);

  const updatePws = (msg) => {
    setPws((pws) => ({
      ...pws,
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
    };
}, []);

	return <Weather data={pws} />

};

const UserContent = () => {
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
	return <SmartThings data={st} />
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "test/mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "test/admin", { headers: authHeader() });
};

const UserService = {
  PublicContent,
  UserContent,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;
