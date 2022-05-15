import { useContext } from "react";
import StSocketContext from "../context/smartthings/st.socket.context.js";
import { Box, Skeleton, Stack } from "@mui/material";
import { Panel } from "./Panel";
export const SmartThings = ({ data }) => {
  const { devices, connected } = useContext(StSocketContext);

  const { panels } = data;

  if (devices) {
    return connected ? (
      <Box>
        {Object.keys(panels).map((panelId) => {
          return (
            <Panel
              key={panelId + "panel"}
              panel={panels[panelId]}
              devices={devices}
            />
          );
        })}
      </Box>
    ) : (
      <Stack>
        <Skeleton variant={"text"} />
        <Skeleton variant={"text"} />
        <Skeleton variant={"text"} />
        <Skeleton variant={"text"} />
        <Skeleton variant={"text"} />
      </Stack>
    );
  } else return null;
};
