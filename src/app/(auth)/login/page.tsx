import { UserAuthForm } from "@/components/forms/UserAuthForm";
export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <UserAuthForm className="w-[500px]" />
    </main>
  );
}
