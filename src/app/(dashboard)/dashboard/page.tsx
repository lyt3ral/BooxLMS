import { LibrarySquare } from "lucide-react";
import BookTable from "@/components/client/BookTable";
import { api } from "@/trpc/server";
import { UserIcon } from "lucide-react";
import { getServerAuthSession } from "@/server/auth";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  const book = await api.book.fetchBooks.query();
  const session = await getServerAuthSession();
  return (
    <main className="mx-8 font-mono">
      <div className="my-8 flex justify-between">
        <div className="flex items-center gap-3">
          <p className="font-mono text-3xl font-bold text-primary">Boox LMS</p>
          <LibrarySquare className="h-7 w-7 " />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <UserIcon className="h-7 w-7" />
            <p>{session?.user.name}</p>
          </div>
        </div>
      </div>
      <BookTable data={book} />
      {/* <div className="flex w-full justify-center">
      
      </div> */}
    </main>
  );
}
