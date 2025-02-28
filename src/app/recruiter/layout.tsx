import MainNavigation from "~/components/navigation/main-navigation";
import UserNavigation from "~/components/navigation/user-navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <header className="sticky border-b border-zinc-400 bg-background">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <MainNavigation />
          <UserNavigation />
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
