import React from 'react';
import { GoogleLogin } from 'react-google-login';

// const clientId =
//   '143343580612-ctj9bl8f1vl11ff57pvvdaolaeokr9pj.apps.googleusercontent.com';

var clientId = process.env.GCP_CLIENT_ID2;

function Login({ setUserData }) {
  function onSuccess(res) {
    alert('Logged in');
    console.log('logged in', res.profileObj);
    setUserData(res.profileObj);
  }

  function onFailure(res) {
    alert('Login failed');
    console.log(res);
  }

  return (
    <div id="singInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      ></GoogleLogin>
    </div>
  );
}

export default Login;
