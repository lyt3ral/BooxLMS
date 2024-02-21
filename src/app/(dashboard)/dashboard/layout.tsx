export const dynamic = "force-dynamic"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col ">
      {children}
      <footer className="mb-24 mt-auto flex w-full justify-center font-mono ">
        by <span className="mx-2 underline">lyteral</span> 🤖
      </footer>
    </main>
  );
}
