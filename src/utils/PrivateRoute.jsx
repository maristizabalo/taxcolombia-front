import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const userState = useSelector((store) => store.userInfo)
    return userState.auth_tokens ? <Outlet /> : <Navigate replace to="/login" />
};

export default PrivateRoute;