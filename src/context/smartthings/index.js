import React, { useState, useEffect } from "react";
import StSocketContext from "./st.socket.context";
import { initSockets } from "../../sockets/smartthings";
const StSocketProvider = (props) => {
  const [stValue, setStValue] = useState({ devices: null });
  useEffect(() => initSockets({ setStValue }), []);
  // Note, we are passing setValue ^ to initSockets
  return (
    <StSocketContext.Provider value={stValue}>
      {props.children}
    </StSocketContext.Provider>
  );
};
export default StSocketProvider;
