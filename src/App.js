import React, { useEffect, useState } from "react";
import io from "socket.io-client";



function App() {
	const Wx = ({data}) => {

		return (
			<div>
				{Object.keys(data).map(wxKey => {
					
					return (
						<div key={wxKey + "div"}>
							<p key={wxKey}>{data[wxKey].title}</p>
							<p key={wxKey + "value"}>{data[wxKey].value}</p>
						</div>
					)
				})}
			</div>
		)
	}	
  const [pws, setPws] = useState({});
  const [pwsConnected, setPwsConnected] = useState(false);

  const [st, setSt] = useState({});
  const [stConnected, setStConnected] = useState(false);
  const [user, setUser] = useState("Ryan");
  
  const updatePws = (msg) => {
  	 setPws(pws => ({
  	 	...pws,
  		...msg,
  		})
  	)
  }
  const updateSt = (msg) => {
  	 setSt(st => ({
  	 	...st,
  		...msg,
  		})
  	)
  }

  useEffect(() => {

    const pwsSocket = io(process.env.REACT_APP_PWS_SOCKET_DOMAIN + "/pwsSocket", {
      forceNew: true,
      path: "/pwsSocket",
      transports: ["websocket", "polling"],
    });

    const stSocket = io(process.env.REACT_APP_ST_SOCKET_DOMAIN + "/stSocket", {
      forceNew: true,
      path: "/stSocket",
      transports: ["websocket", "polling"],
    });
    

    stSocket.emit("getConnectionPacket", user);
    stSocket.on("connect", () => {
    	setStConnected(true)
      console.log("connected to stSocket");
    });
    stSocket.on("disconnect", () => {
    	setStConnected(false)
      console.log("disconnected from stSocket");
    });
    stSocket.on("connectionPacket", (msg) => {
    	updateSt(msg);
    });

    pwsSocket.on("connectionError", (err) => {
      console.log("🚀 ~ file: App.js ~ line 42 ~ pwsSocket.on ~ err", err);
    });
    pwsSocket.on("connect", () => {
      console.log("connected to pwsSocket");
      setPwsConnected(true)
    });
    pwsSocket.on("disconnect", () => {
      setPwsConnected(false)
      console.log("disconnected from pwsSocket");
    });
    pwsSocket.on("data", (msg) => {
      updatePws(msg);
    });

    return () => {
      pwsSocket.close();
      stSocket.close();
    };
  }, [user]);

  return (
    <div className="App">
      {pwsConnected ? <Wx data={pws} />: "not connected"}
    </div>
  );
}

export default App;
