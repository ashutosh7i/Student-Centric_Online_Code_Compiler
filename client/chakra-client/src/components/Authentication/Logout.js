export default function Logout() {
  window.open(`${process.env.REACT_APP_GOOGLE_AUTH}/logout`, "_self");
  console.log("Logout");
  alert("You have been logged out");
}
