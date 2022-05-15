import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import StSocketProvider from "../context/smartthings";
import EventBus from "../common/EventBus";
import { SmartThings } from "./SmartThings";

export const BoardAdmin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        const { data } = response;

        setContent(
          <StSocketProvider>
            <SmartThings data={data} />
          </StSocketProvider>
        );
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return content;
};
