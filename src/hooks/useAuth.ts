import { AuthContext, type AuthContextValue } from '@/contexts/Auth';
import { useContext } from 'react';

const useAuth = (): AuthContextValue => {
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error('Forgot to warp component in AuthContext');

  return authContext;
};

export default useAuth;
