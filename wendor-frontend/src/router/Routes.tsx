import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "../components/Global/Loader";
const HomePage = lazy(() => import("../pages/HomePage"));
const Cart = lazy(() => import("../pages/Cart"));
const Products = lazy(() => import("../pages/Products"));
const Profile = lazy(() => import("../pages/Profile"));
const Purchases = lazy(() => import("../pages/Purchases"));



const RouterLinks = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<HomePage />} />
            <Route element={<ProtectedRoute />}>
                <Route
                    path="/purchases"
                    element={
                        <Suspense fallback={<Loader />}>{<Purchases />}</Suspense>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <Suspense fallback={<Loader />}>{<Profile />}</Suspense>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <Suspense fallback={<Loader />}>{<Products />}</Suspense>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <Suspense fallback={<Loader />}>{<Cart />}</Suspense>
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


