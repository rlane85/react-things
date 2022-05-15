import { Device } from "./smartThings";
import { Box, Grid, Typography } from "@mui/material";

export const Panel = ({ panel, devices }) => {
  const { tiles } = panel;
  return (
    <Box>
      <Typography variant={"h6"}>{panel.label}</Typography>
      <Grid container>
        {tiles.map((tileId) => {
          return <Device key={tileId} device={devices[tileId]} />;
        })}
      </Grid>
    </Box>
  );
};
