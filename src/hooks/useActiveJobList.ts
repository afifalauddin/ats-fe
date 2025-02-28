import { type BaseResponseWithPagination, type JobPosting } from "~/types/api";
import { useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import useApi from "./useApi";

interface Props {
  page?: number;
  limit?: number;
  search?: string;
}

export const useActiveJobList = ({ page = 1, limit = 20, search }: Props) => {
  type ResponseType = BaseResponseWithPagination<JobPosting[]>;
  const { client } = useApi();

  // Fetch active job listing
  const fetchActiveJobListing = async (
    page: number,
    limit: number,
    search?: string,
  ) => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    //check if search is available
    if (search) {
      params.append("search", search);
    }
    const data = await client
      .get<ResponseType>("/posting/list/active", {
        params,
      })
      .then((res) => {
        return res.data.data;
      })
      .catch((error: AxiosError) => {
        console.error("Error fetching active job listing", {
          error: error.response?.data,
        });
        // Return empty array if error
        return [];
      });
    return data;
  };

  const { data, error, status, isPending, isLoading, isFetching, refetch } =
    useQuery<JobPosting[]>({
      queryKey: ["active-job-list"], // Unique key for this query
      queryFn: () => fetchActiveJobListing(page, limit, search), // Function to call for fetching data
      refetchOnWindowFocus: false, // Disable refetch on window focus
      retry: 5, // Number of retries before failing
    });

  return {
    jobPostingList: data,
    jobPostingError: error,
    jobPostingStatus: status,
    isPendingJobPosting: isPending,
    isLoadingJobPosting: isLoading,
    isFetchingJobPosting: isFetching,
    refetchJobPosting: refetch, // Function to refetch data
  };
};
