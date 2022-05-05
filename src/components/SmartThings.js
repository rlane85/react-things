import { Panel } from "./Panel";
export const SmartThings = ({ data }) => {
  console.log(data)
  const { panels, devices } = data;


  return (Object.keys(panels).length > 0) ? (
    <div>

      {Object.keys(panels).map((panelId) => {
        return <Panel key={panelId + "panel"} panel={panels[panelId]} devices={devices}/>;
      })}
    </div>
  ) : (<p><strong>No panels found!</strong></p>);
};
