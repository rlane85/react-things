import { useState } from "react";
import { deviceCommand } from "../../../sockets/smartthings/emits.js";
import styles from "./deviceTypes.module.css";
import { Slider } from "@mui/material";
export const Dimmer = ({ value, id, attribute, awaitingReply }) => {
  // console.log(value);

  const [sliderValue, setSliderValue] = useState(value);
  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  const handleChangeCommit = (event, newValue) => {
    setSliderValue(newValue);
    deviceCommand(id, "level", newValue);
  };
  return (
    <Slider
      value={sliderValue}
      classes={{ thumb: styles.thumb }}
      color={"secondary"}
      step={10}
      marks
      min={0}
      max={100}
      disabled={awaitingReply}
      onChange={handleChange}
      onChangeCommitted={handleChangeCommit}
    />
  );
};
