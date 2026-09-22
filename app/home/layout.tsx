import { AuthButton } from "@/components/Auth/auth-button";
import Toast from "@/components/Toast";
import Link from "next/link";
import { Suspense } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center gap-5 p-2 px-5 text-sm">
            <Link href={"/home"} className="font-mono">{`< Adi />`}</Link>
            <Suspense>
              <AuthButton />
            </Suspense>
          </div>
        </nav>
        <Toast />
        <div className="relative flex-1 flex flex-col gap-5 max-w-5xl xl:w-5xl">
          {children}
        </div>
      </div>
    </main>
  );
}
