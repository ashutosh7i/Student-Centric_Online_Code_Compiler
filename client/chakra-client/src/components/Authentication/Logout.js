export default function Logout() {
  window.open(
    "https://soc.centralindia.cloudapp.azure.com/auth/logout",
    "_self"
  );
  console.log("Logout");
  alert("You have been logged out");
}
