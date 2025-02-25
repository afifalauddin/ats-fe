import MainNavigation from "~/components/main-navigation";
import UserNavigation from "~/components/user-navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="border-dark-400 sticky top-0 z-40 border-b bg-background px-8 md:px-20">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNavigation />
          <UserNavigation />
        </div>
      </header>
      <div className="grid flex-1 gap-12">
        <main className="flex min-w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
