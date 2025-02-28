import {
  type JobStatus,
  type BaseResponseWithPagination,
  type JobPostingWithTotalApplications,
} from "~/types/api";
import { useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import useUser from "./useUser";

interface Props {
  page?: number;
  limit?: number;
  search?: string;
  filter?: JobStatus;
}

type ResponseType = BaseResponseWithPagination<
  JobPostingWithTotalApplications[]
>;

export const useRecruiterJobList = ({
  page = 1,
  limit = 20,
  search,
  filter,
}: Props) => {
  const { apiClient } = useUser();

  // Fetch job listing for dashboard
  const fetchRecruiterJobListing = async (
    page: number,
    limit: number,
    search?: string,
    filter?: JobStatus,
  ) => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    //check if search is available
    if (search) {
      params.append("search", search);
    }

    //check if filter is available
    if (filter) {
      params.append("status", filter);
    }

    const data = await apiClient
      .get<ResponseType>("/posting/list/dashboard", {
        params,
      })
      .then((res) => {
        return res.data.data;
      })
      .catch((error: AxiosError) => {
        console.error("Error fetching active dashboard", {
          error: error.response?.data,
        });
        // Return empty array if error
        return [];
      });
    return data;
  };

  const { data, error, status, isPending, isLoading, isFetching, refetch } =
    useQuery<JobPostingWithTotalApplications[]>({
      queryKey: ["active-job-list"], // Unique key for this query
      queryFn: () => fetchRecruiterJobListing(page, limit, search, filter), // Function to call for fetching data
      refetchOnWindowFocus: false, // Disable refetch on window focus
      retry: 5, // Number of retries before failing
    });

  return {
    jobDashboardList: data,
    jobDashboardError: error,
    jobDashboardStatus: status,
    isPendingJobDashboard: isPending,
    isLoadingJobDashboard: isLoading,
    isFetchingJobDashboard: isFetching,
    refetchJobDashboard: refetch, // Function to refetch data
  };
};
