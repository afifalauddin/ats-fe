interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface BaseResponse<T> {
  success: boolean;
  message: string;
  timestamp: string;
  path: string;
  data: T;
}

export interface BaseResponseWithPagination<T> extends BaseResponse<T> {
  pagination: Pagination;
}

export interface JobPosting {
  id: number;
  title: string;
  description: string;
  requirements: string;
  deadline: string;
  keywords: string[] | null;
  userId: 1;
  createdAt: string;
  updatedAt: string;
}
