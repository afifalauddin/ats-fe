import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1">
      <header className="sticky mb-4 border-b border-zinc-400 bg-background">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <Link href="/" className="flex items-center text-lg font-bold">
            ATS
          </Link>
          <Link href="/login" passHref>
            <Button>Recruiter</Button>
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
