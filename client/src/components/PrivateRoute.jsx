import { Navigate } from 'react-router-dom';
import { useAuth } from '../../tokens/storeTokens';
 

export const PrivateRoute = ({ element: Element }) => {
  const { isLoggedIn } = useAuth;

  return isLoggedIn ? <Element /> : <Navigate to="/login" />;
};
