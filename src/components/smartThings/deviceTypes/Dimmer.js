import { useState } from "react";
import { deviceCommand } from "../../../sockets/smartthings/emits.js";

import { Slider } from "@mui/material";
export const Dimmer = ({ value, id, attribute, awaitingReply }) => {
  // console.log(value);
  const [sliderValue, setSliderValue] = useState(value);
  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  const handleChangeCommit = (event, newValue) => {
    setSliderValue(newValue);
    deviceCommand(id, "switchLevel", "setLevel", newValue);
  };
  return (
    <Slider
      value={sliderValue}
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
