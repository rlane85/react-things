import axios from "axios";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import authHeader from "./auth-header";
import AuthService from "./auth.service"
import { Weather } from "../routes";
const { getCurrentUser } = AuthService;
const API_URL = process.env.REACT_APP_AUTH_DOMAIN + "/api/";

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
      console.log(err);
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

  return <Weather data={pws} />;
};

const getUserContent = () => {
  return axios.get(API_URL + "test/all", { headers: authHeader() });
};

const getModeratorBoard = () => {

  return axios.get(API_URL + "test/mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "test/admin?user=" + getCurrentUser().username, { headers: authHeader() });
};

const UserService = {
  PublicContent,
  getUserContent,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;
