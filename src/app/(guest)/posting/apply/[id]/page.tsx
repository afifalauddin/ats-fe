import { JobApplication } from "~/components/job-application";

export default async function JobApplicationPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;

  return <JobApplication id={id} />;
}
