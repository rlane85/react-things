import { Switch } from "./Switch";
import { Dimmer } from "./Dimmer";
export const Device = ({ device }) => {
  return (
    <div key={device.deviceId}>
      <p>{device.label}</p>
      <ul>
        {Object.keys(device.attributes).map((attributeName) => {
          const { value } = device.attributes[attributeName];
          let component;
          switch (attributeName) {
            case "switch":
              component = (
                <Switch
                  value={value}
                  id={device.deviceId}
                  attribute={"switch"}
                />
              );
              break;
            default:
              component = <p>{value}</p>;

              break;
          }
          // if (device.deviceId === testId) {
          //   console.log(device);
          // }
          return typeof value !== "object" ? (
            <li key={attributeName}>
              {attributeName} {component}
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
};
