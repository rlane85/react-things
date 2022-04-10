export const Device = ({ device }) => {
  return (
    <div key={device.deviceId}>
      <p>{device.label}</p>
      <ul>
        {Object.keys(device.attributes).map((attributeName) => {
          const { value } = device.attributes[attributeName];

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
