import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import { StSocketService } from "../services/st-socket.service";
import EventBus from "../common/EventBus";

export const BoardAdmin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        const { data } = response;

        setContent(<StSocketService userContent={data} />);
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

  return (
    <div className="container">
      <header className="jumbotron">{content}</header>
    </div>
  );
};
