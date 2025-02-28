import { type NavigationItem } from "~/types/navigation";

export const menuConfig: NavigationItem[] = [
  {
    id: 1,
    title: "Manage Job Posting",
    description: "Manage job Applications",
    href: "/job-posting",
    subMenu: [
      {
        id: 11,
        title: "Job Posting",
        description: "Manage job posting",
        href: "/job-posting",
      },
      {
        id: 12,
        title: "Create New Job Posting",
        description: "Manage your job application",
        href: "/job-application",
      },
    ],
  },
];
