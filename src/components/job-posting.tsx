"use client";

import { type FC } from "react";
import { useJobPosting } from "~/hooks/useJobPosting";
import { JobPostingViewer } from "./job-posting-viewer";

interface Props {
  id: number;
}

export const JobPosting: FC<Props> = ({ id }) => {
  const { posting } = useJobPosting({
    id,
  });

  if (!posting) {
    return <div>Job not found</div>;
  }

  return (
    <div className="container grid grid-cols-1 gap-4">
      <h1 className="text-3xl font-bold">{posting.title}</h1>
      <JobPostingViewer content={posting.description} />
      <div>Keywords: {posting.keywords?.join(", ")}</div>
    </div>
  );
};
