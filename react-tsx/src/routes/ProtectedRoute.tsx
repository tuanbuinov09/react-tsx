import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { fetchCurrentUser, selectAuthError, selectCurrentUser } from "../features/authSlice";
import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ProtectedRoute: React.FC<any> = ({ allowRoles }) => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);
  const error = useSelector(selectAuthError);

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<any>();
  const [token, setToken] = useLocalStorage('token', "");

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      setIsLoading(false);
    }

  }, [currentUser]);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    if (error) {
      setIsLoading(false);
    }
  }, [error]);

  return !isLoading ? (allowRoles.includes(currentUser?.role)
    ? (<Outlet />)
    : currentUser
      ? <Navigate to={"/unauthorized"} state={{ from: location }} replace />
      : <Navigate to={"/login"} state={{ from: location }} replace />)
    : <></>
}

export default ProtectedRoute;
