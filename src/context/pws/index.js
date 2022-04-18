import React, { useState, useEffect } from "react";
import PwsSocketContext from "./pws.socket.context";
import { initSockets } from "../../sockets/pws";
const PwsSocketProvider = (props) => {
  const [pwsValue, setPwsValue] = useState({ pws: null });
  useEffect(() => initSockets({ setPwsValue }), []);
  // Note, we are passing setValue ^ to initSockets
  return (
    <PwsSocketContext.Provider value={pwsValue}>
      {props.children}
    </PwsSocketContext.Provider>
  );
};
export default PwsSocketProvider;
