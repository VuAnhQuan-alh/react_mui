import qs from 'qs';
import useRefresh from '@/hooks/useRefresh';
import useStorage from '@/hooks/useStorage';
import { getProfiles } from '@/services/users';
import { PaginationMeta } from '@/utils/types';
import { IFiltersParams, IPerson } from '@/views/users/utils/type';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { ROLES } from '@/constants';
import DateFns from '@/utils/DateFns';

type FILTERS = (filters: IFiltersParams) => void;

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
  filtersProfile: FILTERS;
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
  const [jwt] = useStorage('jwt');

  const filtersProfile = (filters: IFiltersParams) => {
    const date = DateFns.Format(filters.date);
    const fmDate = new Date(date || '');

    const query = qs.stringify(
      {
        populate: '*',
        filters: {
          ...(filters.full_name && {
            full_name: {
              $contains: filters.full_name.toUpperCase(),
            },
          }),

          ...(filters.role > -1 && {
            role: {
              $eq: ROLES.find((item) => item.value === filters.role)?.label,
            },
          }),

          ...(filters.date && {
            date_of_birth: {
              $gte: DateFns.Format(date, 'yyyy-MM-dd'),
              $lt: DateFns.Format(fmDate.setMonth(fmDate.getMonth() + 1), 'yyyy-MM-dd'),
            },
          }),

          ...(filters.confirmed > -1 && {
            confirmed: {
              $eq: Boolean(),
            },
          }),

          ...(filters.gender > -1 && {
            gender: {
              $eq: filters.gender ? 'Male' : 'Female',
            },
          }),
        },

        pagination: {
          page: filters.page,
          pageSize: filters.pageSize,
        },
      },
      { encodeValuesOnly: true },
    );

    getProfiles(query)
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
      .catch((error) => console.log('get-profiles: ', error));
  };

  useEffect(() => {
    if (jwt !== null) {
      const query = qs.stringify({ populate: '*' }, { encodeValuesOnly: true });

      getProfiles(query)
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
    } else {
      console.log('exit-jwt-users');
      setState(initialState);
    }
  }, [refresh, jwt]);

  return <UsersContext.Provider value={{ ...state, filtersProfile }}>{children}</UsersContext.Provider>;
};

export { UsersContext, UsersProvider, type UsersContextValue };
