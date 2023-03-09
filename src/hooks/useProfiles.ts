import { UsersContext, type UsersContextValue } from '@/contexts/Users';
import { useContext } from 'react';

const useProfiles = (): UsersContextValue => {
  const profilesContext = useContext(UsersContext);

  if (!profilesContext) {
    throw new Error('Forgot to warp component in ProfilesContext');
  }

  return profilesContext;
};

export default useProfiles;
