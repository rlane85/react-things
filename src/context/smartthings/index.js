import React, { useState, useEffect } from "react";
import StSocketContext from "./st.socket.context";
import { initSockets, stSocket } from "../../sockets/smartthings";
const StSocketProvider = (props) => {
  const [stValue, setStValue] = useState({ devices: null, connected: false });
  useEffect(() => {
    initSockets(setStValue, stSocket.connected);
    return () => {
      stSocket.close();
      stSocket.off();
    };
  }, []);
  // Note, we are passing setStValue ^ to initSockets

  return (
    <StSocketContext.Provider value={stValue}>
      {props.children}
    </StSocketContext.Provider>
  );
};
export default StSocketProvider;
