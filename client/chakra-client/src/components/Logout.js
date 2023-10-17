import { GoogleLogout } from 'react-google-login';

var clientId = process.env.GCP_CLIENT_ID2;

function onSuccess(setUserData) {
  alert('Logged out');
  console.log('Logged Out');
  setUserData(''); // Clear the user data on logout
}

function Logout({ setUserData }) {
  return (
    <div id="singOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={() => onSuccess(setUserData)}
      />
    </div>
  );
}

export default Logout;
