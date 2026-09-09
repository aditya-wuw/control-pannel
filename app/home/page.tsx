import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Hello from "@/components/home/Hello";
import RegisterPassKey from "@/components/passkey/RegisterPasskey";

async function UserDetails() {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims();

  if (claimsError || !claimsData?.claims) {
    redirect("/");
  }

  const { data: userData } = await supabase.auth.getUser();
  return JSON.stringify(claimsData.claims, null, 2);
}

export default function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      protected route
      <Hello />
      <RegisterPassKey />
    </div>
  );
}
