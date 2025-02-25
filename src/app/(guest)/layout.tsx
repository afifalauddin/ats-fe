export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full">
      <div className="flex flex-1 flex-col justify-center bg-background px-12 pb-16 pt-8 md:py-12 lg:px-20 xl:px-24">
        {children}
      </div>
    </div>
  );
}
