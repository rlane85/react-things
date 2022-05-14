import { useContext } from "react";
import StSocketContext from "../context/smartthings/st.socket.context.js";

import { Panel } from "./Panel";
export const SmartThings = ({ data }) => {
  const { devices } = useContext(StSocketContext);
  const testId = "7ca8fc07-9772-43b5-b4dd-38adcae516c1";
  // console.log(data.devices[testId]);
  const { panels } = data;
  // console.log("%cSmartThings.js line:10 devices", "color: #007acc;", devices);

  if (devices) {
    return Object.keys(panels).length > 0 ? (
      <div>
        {Object.keys(panels).map((panelId) => {
          return (
            <Panel
              key={panelId + "panel"}
              panel={panels[panelId]}
              devices={devices}
            />
          );
        })}
      </div>
    ) : (
      <p>
        <strong>No panels found!</strong>
      </p>
    );
  } else return null;
};
