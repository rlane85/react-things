import { Device } from "./smartThings"

export const Panel = ({panel, devices}) => {
	const { tiles } = panel;
	return (
		<div>
			<h3>{panel.label}</h3>
			{tiles.map(tileId => {
				return<Device key={tileId} device={devices[tileId]} />
			})}
		</div>
	)
}