import useRefresh from '@/hooks/useRefresh';
import useStorage from '@/hooks/useStorage';
import {
  changePassword,
  IValuesForm,
  localProfile,
  LoginParams,
  RegisterParams,
  signIn,
  signUp,
} from '@/services/auth';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';

type Login = typeof signIn;
type Register = typeof signUp;
type ChangePassword = typeof changePassword;

interface IUser {
  username: string;
  updatedAt: Date | string;
  provider: 'local' | string;
  id: number;
  person_profile: any;
  email: string;
  createdAt: Date | string;
  confirmed: boolean;
  blocked: boolean;
  avatar: any;
  role: any;
}

interface State {
  isInitiallized: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
}

const initialState: State = {
  isInitiallized: false,
  isAuthenticated: false,
  user: null,
};

interface AuthContextValue extends State {
  login: Login;
  register: Register;
  changePass: ChangePassword;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const RefreshAuthContext = createContext<VoidFunction | null>(null);

if (process.env.NODE_ENV === 'development') {
  AuthContext.displayName = 'AuthContext';
}

interface IProps {
  children: ReactNode;
}

const AuthProvider = (props: IProps) => {
  const { children } = props;
  const [state, setState] = useState<State>(initialState);
  const [refresh, refetch] = useRefresh();
  const [, setJwt] = useStorage('jwt');

  useEffect(() => {
    localProfile()
      .then((response) => {
        if (response) {
          setState({
            isAuthenticated: true,
            isInitiallized: true,
            user: response,
          });
        } else {
          setState({
            isInitiallized: true,
            isAuthenticated: false,
            user: null,
          });
        }
      })
      .catch((error) => {
        console.log('profile-local: ', error);
        setState({
          isInitiallized: true,
          isAuthenticated: false,
          user: null,
        });
      });
  }, [refresh]);

  const login = async (params: LoginParams) => {
    const response = await signIn(params);
    const { jwt } = response;
    if (jwt) {
      setJwt(jwt);
      refetch();
    }

    return response;
  };

  const register = async (params: RegisterParams) => {
    const response = await signUp(params);
    // const {y/}
    console.log(response);

    return response;
  };

  const logout = () => {
    setJwt(null);
    setState({
      isAuthenticated: false,
      isInitiallized: true,
      user: null,
    });
    refetch();
  };

  const changePass = async (data: IValuesForm) => {
    const response = await changePassword(data);
    console.log(response);

    return response;
  };

  const reset = useCallback(() => {
    setState({
      isInitiallized: true,
      isAuthenticated: false,
      user: null,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, changePass }}>
      <RefreshAuthContext.Provider value={reset}>{children}</RefreshAuthContext.Provider>
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;

export { AuthContext, type AuthContextValue, AuthProvider, AuthConsumer };
