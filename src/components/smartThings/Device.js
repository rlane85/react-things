export const Device = ({ device }) => {
  return (
    <div key={device.deviceId}>
      <p>{device.label}</p>
      <ul>
        {Object.keys(device.attributes).map((attributeName) => {
          const { value } = device.attributes[attributeName];
          if (device.deviceId === "7787f960-4da1-46cb-935d-d9064aa9ca75") {
            console.log(
              "%cDevice.js line:9 attributeName",
              "color: #007acc;",
              attributeName
            );
            console.log("%cDevice.js line:9 value", "color: #007acc;", value);
            console.log(
              "%cDevice.js line:15 typeof value",
              "color: #007acc;",
              typeof value
            );
          }
          return typeof value !== "object" ? (
            <li key={attributeName}>
              {attributeName}: {value}
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
};
