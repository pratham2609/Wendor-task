import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "../components/Global/Loader";
const ProductPage = lazy(() => import("../pages/ProductPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const Cart = lazy(() => import("../pages/Cart"));
const Products = lazy(() => import("../pages/Products"));
const Profile = lazy(() => import("../pages/Profile"));
const Orders = lazy(() => import("../pages/Orders"));

const Router = () => {
    return (
        <Routes>
            <Route path="/"
                element={
                    <Suspense fallback={<Loader />}>
                        <HomePage />
                    </Suspense>
                }
            />
            <Route
                path="/cart"
                element={
                    <Suspense fallback={<Loader />}>
                        <Cart />
                    </Suspense>
                }
            />
            <Route element={<ProtectedRoute />}>
                <Route
                    path="/orders"
                    element={
                        <Suspense fallback={<Loader />}>
                            <Orders />
                        </Suspense>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <Suspense fallback={<Loader />}>
                            <Profile />
                        </Suspense>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <Suspense fallback={<Loader />}>
                            <Products />
                        </Suspense>
                    }
                />
                <Route
                    path="/product/:id"
                    element={
                        <Suspense fallback={<Loader />}>
                            <ProductPage />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
};

export default Router;
