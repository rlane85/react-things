import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import { SocketHandler } from "./components"

function App() {



  return (
  	<SocketHandler />

  );
}

export default App;
