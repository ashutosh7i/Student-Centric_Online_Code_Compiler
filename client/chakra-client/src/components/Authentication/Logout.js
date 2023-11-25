export default function Logout() {
  window.open(
    "http://localhost:5000/auth/logout",
    "_self"
  );
  console.log("Logout");
  alert("You have been logged out");
}
