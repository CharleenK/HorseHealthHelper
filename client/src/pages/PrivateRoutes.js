import { Navigate, Outlet } from "react-router-dom";
import { UsersContext } from "../contexts/UsersContext";
import { useContext } from "react";

const PrivateRoutes = () => {
  const { userData } = useContext(UsersContext);

  return userData ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
