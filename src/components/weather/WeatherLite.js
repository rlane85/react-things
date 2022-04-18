import React, { useContext } from "react";
import PwsSocketContext from "../../context/pws/pws.socket.context.js";
import { round } from "../../common"
import convert from "convert-units";
export const WeatherLite = () => {
  const { pws } = useContext(PwsSocketContext);
  console.log(pws)
	

	return pws ? pws.airTemperature ? (
	
		round(
			convert(
				pws.airTemperature.value)
				.from(pws.airTemperature.originUnit)
				.to(pws.airTemperature.convertUnit
			)
		)
		
	) : "..." : "..."
}
