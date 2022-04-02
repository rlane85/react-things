import { Link, Outlet } from "react-router-dom";

export const SmartThings = ({ data }) => {
  const { devices } = data;
  return (
    <div>
      <Outlet />
      {Object.keys(devices).map((deviceId) => {
        return (
          <div key={deviceId}>
            <Link key={deviceId} to={"/st/" + deviceId}>
              {devices[deviceId].name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
