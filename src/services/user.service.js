import axios from "axios";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import authHeader from "./auth-header";
import { Weather } from "../routes/pws.js"

const API_URL = process.env.REACT_APP_AUTH_DOMAIN +  "/api/test/";

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

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const UserService = {
  PublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;
