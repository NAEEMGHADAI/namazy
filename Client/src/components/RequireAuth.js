import jwtDecode from "jwt-decode";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useContent from "../hooks/useContent";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useContent();
  const location = useLocation();

  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;

  const roles = decoded?.UserInfo?.roles || [];
  console.log(allowedRoles);

  return roles?.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// const RequireAuth = () => {
//   const { auth } = useAuth();
//   const location = useLocation();
//   return auth?.user ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// };

// export default RequireAuth;
