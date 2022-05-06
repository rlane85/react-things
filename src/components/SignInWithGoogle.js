import { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";

const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;

const domain = process.env.REACT_APP_AUTH_DOMAIN;

export const GoogleAuth = () => {
  const [response, setResponse] = useState();
  const [user, setUser] = useState(false)


  const [buttonLabel, setButtonLabel] = useState("Sign In");
  
  useEffect(() => {
			setUser(localStorage.getItem("user"))
			setResponse(user)
      if(user) {setButtonLabel(JSON.parse(user).name)}

	}, [user]);
  
	const responseGoogle = async googleRes => {

		const res = await fetch(domain + "/api/auth/google", {
	      method: "POST",
	      body: JSON.stringify({
	      token: googleRes.tokenId
	    }),
	    headers: {
	      "Content-Type": "application/json"
	    }
	  })
	  const data = await res.json();
		setResponse(JSON.stringify(data));
		if (data.accessToken) {

			localStorage.setItem("user", JSON.stringify(data))
		}
	}
	return (
    <div>
		<GoogleLogin
		    clientId={clientId}
		    buttonText={buttonLabel}
		    onSuccess={responseGoogle}
		    onFailure={responseGoogle}
		    cookiePolicy={"single_host_origin"}
		/>
    {response}
    </div>
	)
}