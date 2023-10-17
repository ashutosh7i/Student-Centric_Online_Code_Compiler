import React, { useEffect, useState } from 'react';
import Login from '../components/Login';
import Logout from '../components/Logout';
import { gapi } from 'gapi-script';

const clientId = process.env.GCP_CLIENT_ID;

export default function Dashboard() {
  const [userData, setUserData] = useState('');

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    }
    gapi.load('client:auth2', start);
  });

  return (
    <>
      <Login setUserData={setUserData} />
      <Logout setUserData={setUserData} />
      {/* <p>{JSON.stringify(userData)}</p> */}
      <p>name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Image: </p>
      <img src={userData.imageUrl} />
    </>
  );
}
