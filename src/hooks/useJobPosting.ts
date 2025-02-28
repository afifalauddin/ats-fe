import { type BaseResponse, type JobPosting } from "~/types/api";
import { useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import useApi from "./useApi";

interface Props {
  id: number;
}

/**
 * Custom hook to fetch and manage data for a specific job posting.
 *
 */
export const useJobPosting = ({ id }: Props) => {
  type ResponseType = BaseResponse<JobPosting>;
  const { client } = useApi();

  // Fetch job listing by id
  const fetchJobPosting = async (id: number) => {
    const data = await client
      .get<ResponseType>(`/posting/${id}`)
      .then((res) => {
        return res.data.data;
      })
      .catch((error: AxiosError) => {
        console.error("Error fetching active job listing", {
          error: error.response?.data,
        });
        // Return empty array if error
        return undefined;
      });
    return data;
  };

  const { data, error, status, isPending, isLoading, isFetching, refetch } =
    useQuery<JobPosting | undefined>({
      queryKey: ["posting", id], // Unique key for this query
      queryFn: () => fetchJobPosting(id), // Function to call for fetching data
      refetchOnWindowFocus: false, // Disable refetch on window focus
      retry: 5, // Number of retries before failing
    });

  return {
    posting: data,
    postingError: error,
    postingStatus: status,
    isPendingPosting: isPending,
    isLoadingPosting: isLoading,
    isFetchingPosting: isFetching,
    refetchJobPosting: refetch, // Function to refetch data
  };
};
