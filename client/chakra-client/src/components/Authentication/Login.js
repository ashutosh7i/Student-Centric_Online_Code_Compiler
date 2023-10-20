import React from "react";
import { GoogleLogin } from "react-google-login";

//Google Authenticaion returns userObject on success
function Login({ setUserData }) {
  function onSuccess(res) {
    alert("Logged in");
    console.log("logged in", res.profileObj);
    setUserData(res.profileObj);
  }

  function onFailure(res) {
    alert("Login failed");
    console.log(res);
  }

  return (
    <div id="singInButton">
      <GoogleLogin
        clientId={process.env.REACT_APP_GCP_CLIENT_ID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      ></GoogleLogin>
    </div>
  );
}

export default Login;
