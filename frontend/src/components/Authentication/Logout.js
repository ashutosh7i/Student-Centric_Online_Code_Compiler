import { useAuth0, Auth0Context, Auth0Provider } from '@auth0/auth0-react'

export default function Logout() {
  const { logout } = useAuth0()
  logout();
  console.log("Logout");
  alert("You have been logged out");
}
