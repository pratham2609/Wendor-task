import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import DashboardLayout from "../components/Layout/DashboardLayout";

const ProtectedRoute = () => {
  const { user } = useAuthContext();
  return (
    (user && user?.id !== "") ? <DashboardLayout>
      <Outlet />
    </DashboardLayout>
      : <Navigate to="/login" replace={true} />
  )
}
export default ProtectedRoute;