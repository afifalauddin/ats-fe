import type { JobPosting as Prop } from "~/types/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const JobPosting: React.FC<{ job: Prop }> = ({ job }) => {
  return (
    <Card className="hover:outline hover:outline-primary">
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{job.description}</CardDescription>
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
          <div className="flex items-center justify-end">read more</div>
        </div>
      </CardContent>
    </Card>
  );
};
