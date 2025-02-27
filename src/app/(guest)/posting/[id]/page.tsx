import Link from "next/link";
import { JobPosting } from "~/components/job-posting";
import { Button } from "~/components/ui/button";

export default async function JobPostingPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;

  return (
    <div className="border-1 grid grid-cols-4 p-4">
      <div className="col-span-3">
        <JobPosting id={id} />
      </div>
      <Link href={`/posting/apply/${id}`} passHref>
        <Button size="sm" className="max-w-fit">
          Apply Now
        </Button>
      </Link>
    </div>
  );
}
