export type NavigationItem = {
  id: number;
  title: string;
  description?: string;
  href: string;
  subMenu?: NavigationItem[];
};
