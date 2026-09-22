import { ThemeSwitcher } from "@/components/theme-switcher";
import { LoginForm } from "@/components/login-form";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="py-5 px-2 flex items-center justify-between">
            <h1 className="font-mono xl:text-2xl text-xl">Welcome home, Adi</h1>
            <ThemeSwitcher />
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
