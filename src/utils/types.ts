export interface ProfileValues {
  full_name: string;
  date_of_birth: Date | string;
  email: string;
  phone_number: string;
  gender: number;
  address: string;
  role: number;
  avatar: any;
}

export interface PaginationMeta {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

export interface FILE extends FileList {
  preview: string | null;
}
