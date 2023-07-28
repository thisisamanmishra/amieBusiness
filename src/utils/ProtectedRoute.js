import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";


const ProtectedRoute = ({ role, children }) => {
    const { isLoading, isAuthenticated, restaurant } = useSelector((state) => state.restaurantState);

    return (
        <Fragment>
            {!isLoading && !isAuthenticated && <Navigate to="/signin" />}
            {role !== 'admin' && !isLoading && isAuthenticated && children}
            {role === 'admin' && !isLoading && isAuthenticated && restaurant.role === 'admin' && children}
            {role === 'admin' && !isLoading && isAuthenticated && restaurant.role !== 'admin' && <Navigate to="/account" />}
            {isLoading && <Loader />}
        </Fragment>
    )
}
export default ProtectedRoute;