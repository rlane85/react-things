
import { GoogleLogin } from "react-google-login";

const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;

const domain = process.env.REACT_APP_AUTH_DOMAIN;
const buttonLabel = "Sign In"
export const GoogleAuth = ({navToProfile}) => {

  
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

		if (data.accessToken) {
			localStorage.setItem("user", JSON.stringify(data));
      navToProfile();
		}
	}
	return (
		<GoogleLogin
		    clientId={clientId}
		    buttonText={buttonLabel}
		    onSuccess={responseGoogle}
		    onFailure={responseGoogle}
		    cookiePolicy={"single_host_origin"}
		/>
	)
}