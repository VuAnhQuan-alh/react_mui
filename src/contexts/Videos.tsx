import useStorage from '@/hooks/useStorage';
import { getListVideos } from '@/services/videos';
import { createContext, ReactNode, useEffect, useState } from 'react';
import qs from 'qs';
import useAuth from '@/hooks/useAuth';
import { PaginationMeta } from '@/utils/types';
import { IVideos } from '@/views/videos/utils/type';
import useRefresh from '@/hooks/useRefresh';

interface AccVideo {
  id: number;
  attributes: IVideos;
}
interface Props {
  children: ReactNode;
}
interface VideoContextValue {
  list: [];
  meta: PaginationMeta;
}

const VideoContext = createContext<VideoContextValue | null>(null);

const VideoProvider = ({ children }: Props) => {
  const [state, setState] = useState<VideoContextValue>({
    list: [],
    meta: { page: 1, pageSize: 25, pageCount: 0, total: 0 },
  });
  const [jwt] = useStorage('jwt');
  const { user } = useAuth();
  const [refresh] = useRefresh();

  useEffect(() => {
    if (jwt) {
      const query = qs.stringify(
        {
          populate: ['person_profile', 'play'],
          // filters: {
          //   person_profile: {
          //     id: {
          //       $eq: user?.person_profile.id,
          //     },
          //   },
          // },
        },
        { encodeValuesOnly: true },
      );

      getListVideos(query)
        .then((res) => {
          if (res) {
            const { data, meta } = res;
            setState((state) => ({
              ...state,
              list: data.reduce((acc: AccVideo[], curr: AccVideo) => {
                return [...acc, { id: curr.id, ...curr.attributes, play: curr.attributes.play.data.attributes.url }];
              }, []),
              meta: meta.pagination,
            }));
          }
        })
        .catch((error) => console.log('list-video: ', error));
    } else {
      console.log('exit-jwt-video');
      setState((state) => ({ ...state, list: [] }));
    }
    // eslint-disable-next-line
  }, [jwt, refresh]);

  return <VideoContext.Provider value={{ ...state }}>{children}</VideoContext.Provider>;
};

export { VideoContext, VideoProvider, type VideoContextValue };
