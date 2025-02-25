
import { Navigate, useLocation } from 'react-router-dom';
import { getFromLocalStorage } from '../helpers/utils/saveData';
import { getUserInfo } from '../services/auth.service';
import toast from 'react-hot-toast';

const PrivateRoutes = ({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string; // Optional role check
}) => {
  const userInfo = getUserInfo();
  const userRole =
    userInfo && typeof userInfo !== 'string' ? userInfo.role : null;

  const { pathname } = useLocation();
  const token = getFromLocalStorage("accessToken");
  const phone = getFromLocalStorage("phone");

  if (!token && !phone) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  if (requiredRole && userRole !== requiredRole) {
    toast.error('You are not authorized to access this page');
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoutes;