export default function Login() {
  window.open(`${process.env.REACT_APP_GOOGLE_AUTH}/google`, "_self");
  console.log("Login");
}
