import {
  Grid,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";

import { orange } from "@mui/material/colors";
import { Actuator, Dimmer, Colorful } from "./deviceTypes";
export const Device = ({ device }) => {
  const loaderColor = orange;
  const { deviceId, label, attributes } = device;
  const actuators = [];
  const nonActuators = [];
  Object.keys(attributes).map((attributeName) => {
    const { value, awaitingReply } = attributes[attributeName];
    switch (attributeName) {
      case "switch":
        actuators.push(
          <Grid
            item
            container
            justifyContent={"center"}
            xs={12}
            key={attributeName + deviceId}
            sx={{ m: 3, position: "relative" }}
          >
            <Actuator
              value={value}
              id={deviceId}
              attribute={"switch"}
              awaitingReply={awaitingReply}
            />
            {awaitingReply && (
              <CircularProgress
                size={24}
                sx={{
                  color: loaderColor[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Grid>
        );
        break;
      case "level":
        actuators.push(
          <Grid
            item
            key={attributeName + deviceId}
            sx={{ m: 3, position: "relative" }}
            xs={12}
          >
            <Dimmer
              value={value}
              id={deviceId}
              attribute={"level"}
              awaitingReply={awaitingReply}
            />
            {awaitingReply && (
              <CircularProgress
                size={24}
                sx={{
                  color: loaderColor[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Grid>
        );
        break;
      case "hue":
        actuators.push(
          <Grid
            item
            key={attributeName + deviceId}
            sx={{ m: 3, position: "relative" }}
            xs={12}
          >
            <Colorful
              value={value}
              id={deviceId}
              attribute={"level"}
              awaitingReply={awaitingReply}
            />
            {awaitingReply && (
              <CircularProgress
                size={24}
                sx={{
                  color: loaderColor[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Grid>
        );
        break;
      default:
        if (typeof value !== "object") {
          nonActuators.push(
            <Grid item key={attributeName + deviceId}>
              <Typography>{attributeName}</Typography>
              <Typography>{value}</Typography>
            </Grid>
          );
        }
        break;
    }
    return null;
  });
  return (
    <Grid item key={"root" + deviceId}>
      <Card>
        <CardContent>
          <Typography variant={"h6"}>{label}</Typography>
          {nonActuators}
        </CardContent>
        <CardActions>
          <Grid container>{actuators}</Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};
