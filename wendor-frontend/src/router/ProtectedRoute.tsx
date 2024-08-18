import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuthContext();
  return (
    <>
      {
        user && user?.id ? <>
          <Outlet />
        </>
          : <Navigate to="/" replace={true} />
      }
    </>
  )
}
export default ProtectedRoute;