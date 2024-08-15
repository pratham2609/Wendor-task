import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import DashboardLayout from "../components/Layout/DashboardLayout";

const ProtectedRoute = () => {
  const { user } = useAuthContext();
  return (
    <>
      {
        user?.id !== "" && (user.role === "admin") ? <DashboardLayout>
          <Outlet />
        </DashboardLayout>
          : <Navigate to="/" replace={true} />
      }
    </>
  )
}
export default ProtectedRoute;