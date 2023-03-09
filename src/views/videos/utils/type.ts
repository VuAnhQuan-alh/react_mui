import { PaginationParams } from '@/components/pro-table/types';

export interface IVideos {
  content: string;
  play: any;
  public: boolean;
  person_profile: any;
}

export interface IFiltersValueVideo {
  content: string;
  public: number;
  from: string | null;
  to: string | null;
}

export interface IFiltersParamsVideo extends PaginationParams {
  content: string;
  public: number;
  from: string | null;
  to: string | null;
}

export interface IFormCreateVideo {
  content: string;
  public: boolean;
}
