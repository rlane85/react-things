/*
import { Link, Outlet } from "react-router-dom";
import { DeviceRoutes } from "./smartThings/DeviceRoutes";
export const SmartThings = ({ data }) => {
  const { devices } = data;
  return (
    <div>
      <DeviceRoutes devices={devices} />
      {Object.keys(devices).map((deviceId) => {
        return (
          <div key={deviceId}>
            <Link key={deviceId} to={"/st/devices/" + deviceId}>
              {devices[deviceId].name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
*/