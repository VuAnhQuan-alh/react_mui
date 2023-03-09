import { type PaginationParams } from '@/components/pro-table/types';

export interface IPerson {
  // id?: number;
  full_name: string;
  email: string;
  gender: string;
  avatar: any;
  phone_number: string | null;
  date_of_birth: Date | string;
  address: string;
  role: string;
  confirmed: boolean;

  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IFiltersParams extends PaginationParams {
  full_name: string;
  date: string | null;
  role: number;
  confirmed: number;
  gender: number;
}

export interface IFiltersValues {
  full_name: string;
  date: string | null;
  role: number;
  confirmed: number;
  gender: number;
}
