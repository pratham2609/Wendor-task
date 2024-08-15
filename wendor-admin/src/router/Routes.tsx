import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../components/Loader";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Sales = lazy(() => import("../pages/Dashboard/Sales"));
const Inventory = lazy(() => import("../pages/Dashboard/Inventory"));
const Products = lazy(() => import("../pages/Dashboard/Products"));
const Companies = lazy(() => import("../pages/Dashboard/Companies"));
const Settings = lazy(() => import("../pages/Dashboard/Settings"));



const RouterLinks = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
            <Route element={<ProtectedRoute />}>
                <Route
                    path="/dashboard"
                    element={
                        <Suspense fallback={<Loader />}>{<Dashboard />}</Suspense>
                    }
                />
                <Route
                    path="/inventory"
                    element={
                        <Suspense fallback={<Loader />}>{<Inventory />}</Suspense>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <Suspense fallback={<Loader />}>{<Products />}</Suspense>
                    }
                />
                <Route
                    path="/companies"
                    element={
                        <Suspense fallback={<Loader />}>{<Companies />}</Suspense>
                    }
                />
                <Route
                    path="/sales"
                    element={
                        <Suspense fallback={<Loader />}>{<Sales />}</Suspense>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <Suspense fallback={<Loader />}>{<Settings />}</Suspense>
                    }
                />
            </Route>
        </Route>
    ),
    {
        basename: "/",
    }
);

export default RouterLinks;


