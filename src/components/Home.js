import React from "react";

import UserService from "../services/user.service";

const Home = ({data}) => {

  const { PublicContent } = UserService;

  
  return (
    <div className="container">
      <header className="jumbotron">
	  	<PublicContent />
      </header>
    </div>
  );
};

export default Home;
