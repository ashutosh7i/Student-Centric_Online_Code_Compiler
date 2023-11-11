export default function Logout() {
  window.open("http://localhost:5000/auth/logout", "_self");
  console.log("Logout");
}
