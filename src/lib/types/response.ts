export interface Response<T> {
  success: boolean;
  message: string;
  data: {
    data: T;
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface SingleResponse<T> {
  success: boolean;
  message: string;
  data: T
}