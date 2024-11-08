import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { fetchCurrentUser, selectCurrentUser } from "../features/authSlice";
import React, { useEffect, useState } from "react";

const ProtectedRoute: React.FC<any> = ({ allowRoles }) => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser)
      setIsLoading(false);
    }
  }, [currentUser]);

  return !isLoading ? (allowRoles.includes(currentUser?.role)
    ? (<Outlet />)
    : currentUser
      ? <Navigate to={"/unauthorized"} state={{ from: location }} replace />
      : <Navigate to={"/login"} state={{ from: location }} replace />)
    : <></>
}

export default ProtectedRoute;
