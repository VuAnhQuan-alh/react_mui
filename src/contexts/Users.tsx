import useRefresh from '@/hooks/useRefresh';
import { getProfiles } from '@/services/users';
import { PaginationMeta } from '@/utils/types';
import { IPerson } from '@/views/users/utils/type';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface AccPerson {
  id: number;
  attributes: IPerson;
}

interface State {
  list: IPerson[];
  meta: PaginationMeta;
}
interface UsersContextValue extends State {
  update?: any;
}
interface Props {
  children: ReactNode;
}

const initialState = {
  list: [],
  meta: {
    page: 1,
    pageSize: 25,
    pageCount: 0,
    total: 0,
  },
};
const UsersContext = createContext<UsersContextValue | null>(null);

const UsersProvider = ({ children }: Props) => {
  const [state, setState] = useState<State>(initialState);
  const [refresh] = useRefresh();

  useEffect(() => {
    getProfiles({})
      .then((res) => {
        if (res) {
          const pagination = res.meta.pagination;
          const data = res.data.reduce((acc: AccPerson[], curr: AccPerson) => {
            const item = { id: curr.id, ...curr.attributes, avatar: curr.attributes.avatar.data.attributes.url };
            return [...acc, item];
          }, []);
          setState((state) => ({ ...state, list: [...data], meta: { ...pagination } }));
        }
      })
      .catch((error) => console.log('list-profiles: ', error));
  }, [refresh]);

  return <UsersContext.Provider value={{ ...state }}>{children}</UsersContext.Provider>;
};

export { UsersContext, UsersProvider, type UsersContextValue };
