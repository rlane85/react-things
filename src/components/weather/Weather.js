import React, { useContext } from "react";
import PwsSocketContext from "../../context/pws/pws.socket.context.js";
import { round } from "../../common"

import convert from "convert-units";

import styles from './weather.module.css'; 
import { Typography } from '@mui/material';
export const Weather = () => {
	const { metric } = styles;
  const { pws } = useContext(PwsSocketContext);
  return pws ? (
    <div>
      {Object.keys(pws).map((objKey) => {
        //destructure the object
        const { value, title, originUnit, convertUnit } = pws[objKey];
        //is there an indication the value needs to be converted?
        const convertValue =
          originUnit !== convertUnit
            ? //if so round the conversion
              round(convert(value).from(originUnit).to(convertUnit))
            : //if not, give raw value
              value;

        //convert to time if needed
        const realValue =
          title === "Time"
            ? new Date(value * 1000).toLocaleString()
            : convertValue;

        return (
          <div key={title} >
            <Typography>{title}</Typography>
            {" "}
						<span className={metric}>
							{realValue}
						</span>
						{" "}
						{convertUnit}
          </div>
        );
      })}
    </div>
  ) : (
    <p>Waiting for pws</p>
  );
};
