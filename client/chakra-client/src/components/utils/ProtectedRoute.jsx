import { useRecoilValue } from "recoil";
import { userState } from "../../state";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = useRecoilValue(userState);
  const location = useLocation();

  if (user) {
    return children;
  } else {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
}
