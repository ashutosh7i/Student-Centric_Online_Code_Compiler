import { useRecoilValue } from "recoil";
import { userState } from "../../state";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // Assuming you're using Auth0
  
export default function ProtectedRoute({ children }) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  // if (isLoading) {
  //   console.log("when loading", user)
  //   return <div>Loading...</div>;
  // }

  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
}