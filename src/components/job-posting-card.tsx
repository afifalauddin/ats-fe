import type { JobPosting as Prop } from "~/types/api";

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

export const JobPostingCard: React.FC<{ job: Prop }> = ({ job }) => {
  return (
    <Card className="hover:outline hover:outline-primary">
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <TruncatedMdText text={job.description} />
        </CardDescription>
        <div className="grid grid-cols-2">
          <div className="inline-flex gap-1 text-sm text-zinc-500">
            <div className="font-semibold">Keywords:</div>
            {job.keywords?.map((keyword, i) => (
              <div
                key={`${keyword}_${i}`}
                className="cursor-crosshair hover:outline hover:outline-primary"
              >
                {keyword}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end">
            <Link href={`/posting/${job.id}`}>
              <Button size="sm">Read More</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
