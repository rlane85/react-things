import React from "react";
import { Weather } from "./weather";
const Home = () => {
  return (
    <div className="container">
      <header className="jumbotron">Home</header>
      <Weather />
    </div>
  );
};

export default Home;
