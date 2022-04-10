import { Device } from "./smartThings/Device";
export const SmartThings = ({ data }) => {
  const { devices } = data;

  return (
    <div>
      {" "}
      {Object.keys(devices).map((deviceId) => {
        return <Device key={deviceId + "device"} device={devices[deviceId]} />;
      })}
    </div>
  );
};
