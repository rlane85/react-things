import { useState } from "react";

import { deviceCommand } from "../../../sockets/smartthings/emits.js";
import {
  percentHueToDegrees,
  degreesHueToPercent,
} from "../../../common/colors";
import {
  HSLSliderProvider,
  HueSlider,
} from "@igloo_cloud/material-ui-color-sliders";

export const Colorful = ({ value, id, awaitingReply }) => {
  const [sliderValue, setSliderValue] = useState(percentHueToDegrees(value));

  const handleChange = (newValue) => {
    setSliderValue(newValue);
  };
  const handleChangeCommit = (event, newValue) => {
    setSliderValue(newValue);
    deviceCommand(id, "hue", degreesHueToPercent(newValue));
  };
  const dimmed = awaitingReply ? 0.5 : 1;
  return (
    <HSLSliderProvider defaultValues={[sliderValue]}>
      <HueSlider
        onChange={handleChange}
        onChangeCommitted={handleChangeCommit}
        style={{ opacity: dimmed }}
      />
      {sliderValue}
    </HSLSliderProvider>
  );
};
