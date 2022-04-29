import { GoogleLogin } from "react-google-login";
import { useState } from "react"
const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;
const domain = process.env.REACT_APP_AUTH_DOMAIN;
export const SignUpWithGoogle = () => {
  const [response, setResponse] = useState("waiting response")
	const responseGoogle = async googleRes => {

	const res = await fetch(domain + "/api/auth/googleUp", {
      method: "POST",
      body: JSON.stringify({
      token: googleRes.tokenId
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await res.json()
	setResponse(JSON.stringify(data));
  // store returned user somehow
	}
	return (
    <div>
		<GoogleLogin
		    clientId={clientId}
		    buttonText="Sign Up"
		    onSuccess={responseGoogle}
		    onFailure={responseGoogle}
		    cookiePolicy={"single_host_origin"}
		/>
    {response}
    </div>
	)
}
export const SignInWithGoogle = () => {
  const [response, setResponse] = useState("waiting response")
	const responseGoogle = async googleRes => {

	const res = await fetch(domain + "/api/auth/googleIn", {
      method: "POST",
      body: JSON.stringify({
      token: googleRes.tokenId
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await res.json()
	setResponse(JSON.stringify(data));
  // store returned user somehow
	}
	return (
    <div>
		<GoogleLogin
		    clientId={clientId}
		    buttonText="Login"
		    onSuccess={responseGoogle}
		    onFailure={responseGoogle}
		    cookiePolicy={"single_host_origin"}
		/>
    {response}
    </div>
	)
}