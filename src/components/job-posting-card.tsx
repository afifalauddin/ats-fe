import type { JobPostingWithTotalApplications } from "~/types/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { TruncatedMdText } from "./truncated-paragraph";
import { Button } from "./ui/button";
import Link from "next/link";

interface Props {
  job: Partial<JobPostingWithTotalApplications>;
  link?: string;
  btnText?: string;
}

export const JobPostingCard: React.FC<Props> = ({ job, link, btnText }) => {
  return (
    <Card className="hover:outline hover:outline-primary">
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-1">
        <CardDescription>
          <TruncatedMdText text={job.description} />
        </CardDescription>
        {job.totalApplications ? (
          <CardDescription>
            Total Applications: {job.totalApplications}
          </CardDescription>
        ) : job.totalApplications === 0 ? (
          <CardDescription>Total Applications: N/A</CardDescription>
        ) : null}

        <div className="grid grid-cols-2">
          <div className="inline-flex gap-1 text-sm text-zinc-500">
            <div className="font-semibold">Keywords:</div>
            {job.keywords?.map((keyword, i) => (
              <div
                key={`${keyword}_${i}`}
                className="hover:underline-primary cursor-pointer hover:underline"
              >
                {keyword}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end">
            <Link href={`/${link ?? "posting"}/${job.id}`}>
              <Button size="sm">{btnText ?? "Read more"}</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
