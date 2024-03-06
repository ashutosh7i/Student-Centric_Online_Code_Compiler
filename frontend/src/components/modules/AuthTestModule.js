// import React, { useEffect, useState } from "react";
// import Login from "../Authentication/Login";
// import Logout from "../Authentication/Logout";
// import { gapi } from "gapi-script";

// export default function Dashboard() {
//   const [userData, setUserData] = useState("");

//   useEffect(() => {
//     function start() {
//       gapi.client.init({
//         clientId: process.env.REACT_APP_GCP_CLIENT_ID,
//         scope: "https://www.googleapis.com/auth/userinfo.profile",
//       });
//     }
//     gapi.load("client:auth2", start);
//   });

//   return (
//     <>
//       <Login setUserData={setUserData} />
//       <Logout setUserData={setUserData} />
//       {/* <p>{JSON.stringify(userData)}</p> */}
//       <p>name: {userData.name}</p>
//       <p>Email: {userData.email}</p>
//       <p>Image: </p>
//       <img src={userData.imageUrl} alt="test image" />
//     </>
//   );
// }
