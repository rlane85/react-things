export const SmartThings = ({ data }) => {
  const { devices } = data;

  return (
    <div>
      {Object.keys(devices).map((deviceId) => {
        return (
          <div key={deviceId}>
            <button key={deviceId}>{devices[deviceId].name}</button>
            <p key={deviceId + "value"}>
              {JSON.stringify(
                Object.values(devices[deviceId].attributes),
                null,
                1
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
};
