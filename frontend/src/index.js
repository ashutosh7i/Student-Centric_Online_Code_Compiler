import React from "react";
import * as ReactDOM from "react-dom/client";
//
import { ColorModeScript } from "@chakra-ui/react";
//
import { Auth0Provider } from "@auth0/auth0-react";
//
import App from "./App.js";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
console.log(window.location.origin);
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirect_uri={process.env.REACT_APP_CLIENT_URL}
  >
    <ColorModeScript />
    <App />
  </Auth0Provider>
);
