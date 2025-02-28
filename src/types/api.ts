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
  createdAt: string;
  updatedAt: string;
}

export interface JobPostingWithTotalApplications extends JobPosting {
  totalApplications: number;
}

export type JobStatus = "submitted" | "reviewed" | "accepted" | "rejected";
