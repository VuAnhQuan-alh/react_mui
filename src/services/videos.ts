import { API_LIST_VIDEOS } from '@/constants/api-path';
import HttpClient from '@/utils/HttpClient';

export const getListVideos = (query: any) => {
  return HttpClient.get<null, any>(`${API_LIST_VIDEOS}?${query}`);
};
