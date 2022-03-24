export const Weather = ({data}) => {

		return (
			<div>
				{Object.keys(data).map(wxKey => {
					
					return (
						<div key={wxKey + "div"}>
							<p key={wxKey}>{data[wxKey].title}</p>
							<p key={wxKey + "value"}>{data[wxKey].value}</p>
						</div>
					)
				})}
			</div>
		)
	}	