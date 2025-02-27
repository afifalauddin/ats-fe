"use client";

import { useActiveJobList } from "~/hooks/useActiveJobList";
import { JobPostingCard } from "./job-posting-card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

export const JobPostingList: React.FC = () => {
  const [search, setSearch] = useState("");

  const {
    jobPostingList,
    isFetchingJobPosting,
    isLoadingJobPosting,
    refetchJobPosting,
  } = useActiveJobList({
    search,
  });

  if (isFetchingJobPosting || isLoadingJobPosting) {
    return <div>Loading...</div>;
  }

  if (!jobPostingList) {
    return <div>No job postings available</div>;
  }

  const doSearch = async () => {
    await refetchJobPosting();
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="inline-flex gap-4">
        <Input
          placeholder="title, skill, description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="secondary" type="button" onClick={doSearch}>
          Search
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {jobPostingList?.map((job) => (
          <JobPostingCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};
