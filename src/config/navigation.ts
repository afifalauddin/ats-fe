import { type NavigationItem } from "~/types/navigation";

export const menuConfig: NavigationItem[] = [
  {
    id: 1,
    title: "Manage Job Posting",
    description: "Manage job Applications",
    href: "/recruiter/dashboard",
    subMenu: [
      {
        id: 11,
        title: "Job Posting",
        description: "Manage job posting",
        href: "/recruiter/dashboard",
      },
      {
        id: 12,
        title: "Create New Job Posting",
        description: "Manage your job application",
        href: "/recruiter/job-posting/create",
      },
    ],
  },
];
