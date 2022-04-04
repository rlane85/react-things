import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = ({data}) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
		  const placeholderData = "Our Meterological Observations"
        setContent(placeholderData);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
		<div>{data.pws}</div>
      </header>
    </div>
  );
};

export default Home;
