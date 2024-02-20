import { RegisterForm } from "@/components/forms/UserRegisterForm";
export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <RegisterForm className="w-[500px]" />
    </main>
  );
}