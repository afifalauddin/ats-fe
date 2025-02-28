"use client";

import { JobPostingCard } from "./job-posting-card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRecruiterJobList } from "~/hooks/useRecruiterList";
import { type JobStatus } from "~/types/api";
import { StatusCombobox } from "./status-combobox";

export const JobPostingDashboard: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<JobStatus>();

  const {
    jobDashboardList,
    isFetchingJobDashboard,
    isLoadingJobDashboard,
    refetchJobDashboard,
  } = useRecruiterJobList({
    search,
    filter,
  });

  if (isFetchingJobDashboard || isLoadingJobDashboard) {
    return <div>Loading...</div>;
  }

  if (!jobDashboardList) {
    return <div>No job postings available</div>;
  }

  const doSearch = async () => {
    await refetchJobDashboard();
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex w-full justify-end">
        <Button className="bg-blue-600">Create New posting</Button>
      </div>

      <div className="inline-flex gap-4">
        <Input
          placeholder="title, skill, description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <StatusCombobox value={filter} setValueAction={setFilter} />
        <Button variant="secondary" type="button" onClick={doSearch}>
          Search
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {jobDashboardList?.map((job) => (
          <JobPostingCard key={job.id} job={job} btnText="View details" />
        ))}
      </div>
    </div>
  );
};
