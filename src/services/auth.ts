import { API_CHANGE_PASSWORD, API_CREATE_PROFILE, API_LOGIN, API_PROFILE, API_REGISTER } from '@/constants/api-path';
import HttpClient from '@/utils/HttpClient';
import qs from 'qs';

export interface LoginParams {
  identifier: string;
  password: string;
}

export interface RegisterParams {
  username: string;
  email: string;
  password: string;
}

export interface IValuesForm {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

type Role = 'Project Manager' | 'Construction Expeditor' | 'Surveyor' | 'Electrician' | 'Subcontractor' | 'Estimator';

export interface ProfileParams {
  full_name: string;
  avatar: any;
  date_of_birth: Date | string;
  email: string;
  gender: 'Female' | 'Male';
  phone_number: string;
  address: string;
  role: Role;
  confirmed: boolean;
  users_permissions_user: any;
}

const signIn = (params: LoginParams) => {
  return HttpClient.post<typeof params, any>(API_LOGIN, params);
};

const signUp = (params: RegisterParams) => {
  return HttpClient.post<typeof params, any>(API_REGISTER, params);
};

const localProfile = () => {
  const query = qs.stringify(
    {
      populate: ['person_profile', 'person_profile.avatar', 'role'],
    },
    { encodeValuesOnly: true },
  );
  return HttpClient.get<null, any>(`${API_PROFILE}?${query}`);
};

const createProfile = (data: ProfileParams) => {
  return HttpClient.post<typeof data, any>(API_CREATE_PROFILE, data);
};

const changePassword = (data: IValuesForm) => {
  return HttpClient.post<typeof data, any>(API_CHANGE_PASSWORD, data);
};

export { signIn, signUp, localProfile, createProfile, changePassword };
