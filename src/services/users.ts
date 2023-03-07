import { API_LIST_PROFILES } from '@/constants/api-path';
import HttpClient from '@/utils/HttpClient';

export const getProfiles = (query: any) => {
  return HttpClient.get<null, any>(`${API_LIST_PROFILES}?populate=*`);
};
