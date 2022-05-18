import React, { useState, useEffect } from "react";
import StSocketContext from "./st.socket.context";
import { initSockets, stSocket } from "../../sockets/smartthings";
const StSocketProvider = (props) => {
  const [stValue, setStValue] = useState({ devices: null, connected: false });
  // console.log(stValue.connected);
  useEffect(() => {
    // console.log(stValue.connected);
    initSockets(setStValue, stValue.connected);
    return () => {
      stSocket.disconnect();
      stSocket.off("connect");
      stSocket.off("disconnect");
      stSocket.off("ack");
      stSocket.off("connectionPacket");
      stSocket.off("event");
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
