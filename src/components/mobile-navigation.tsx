import { useLockBody } from "~/hooks/useLockBody";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { menuConfig } from "~/config/navigation";

interface Props {
  children?: React.ReactNode;
}

const MobileNavigation = ({ children }: Props) => {
  useLockBody();

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden",
      )}
    >
      <div className="bg-dark-400 relative z-20 grid gap-6 rounded-md p-4 text-popover-foreground shadow-md">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {menuConfig.map((menu) => (
            <Link
              key={menu.id}
              href={menu.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
              )}
            >
              {menu.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
};

export default MobileNavigation;
