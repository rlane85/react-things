import convert from "convert-units"
export const Weather = ({ data }) => {
const round = num => {
	return Math.round(num * 100) / 100;
}

	return data ? (
		<div>
			{Object.keys(data).map(objKey => {
				//destructure thr object
				const { value, title, originUnit, convertUnit } = data[objKey];
				//is there an indication the value needs to be converted?
				const convertValue = (originUnit !== convertUnit) ? (
				//if so round the conversion
					round(convert(value).from(originUnit).to(convertUnit))
					//if not, give raw value
				) : value

				//convert to time if needed
				const realValue = (title === "Time") ? new Date(value * 1000).toLocaleString() : convertValue

				return (
					<p key={title}> {title} {realValue} {convertUnit}</p>
				)
			})}
		</div>
	) : (
	<p>Waiting for data</p>)
}
