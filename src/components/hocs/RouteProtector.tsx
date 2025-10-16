
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectUserDetails } from "../../redux/userSlice";

type RouteProtectorProps = {
  children: ReactNode;
  roles: string[];
};

const RouteProtector: React.FC<RouteProtectorProps> = ({ roles, children }) => {
  const user = useAppSelector(selectUserDetails) || {}; // Ensure isAuthenticated is used
  if (!user.loggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated but not authorized
  const isAuthorized = roles.includes(user.role!);
  if (!isAuthorized || user.role == "student") {
    return <Navigate to="/student" replace />;
  }
  //check  the other roles later
  // Render children if all checks pass
  return <>{children}</>;
};

export default RouteProtector;