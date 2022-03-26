import convert from "convert-units"
export const Weather = ({ data }) => {
const round = num => {
	return Math.round(num * 100) / 100;
}

	return data ? (
		<div>
		{Object.keys(data).map(objKey => {
			const { unitTitle, value, title, originUnit, convertUnit } = data[objKey]
			const convertValue = (originUnit !== convertUnit) ? round(convert(value).from(originUnit).to(convertUnit)) : value;
			const realValue = (title === "Time") ? new Date(value * 1000).toLocaleString() : convertValue

			return (
				<p key={title}> {title} {realValue} {convertUnit}</p>
			)
		})}
		</div>
	) : (
	<p>Waiting for data</p>)
}