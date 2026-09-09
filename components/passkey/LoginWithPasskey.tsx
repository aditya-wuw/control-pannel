"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginWithPassKey({ ...props }) {
  const router = useRouter();

  const handleLoginWithPasskey = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPasskey();
    if (error) toast.error(`${error.message}[${error.code}]`);
    router.push("/home");
  };

  return (
    <Button type="button" onClick={handleLoginWithPasskey} {...props}>
      {" "}
      Passkey
    </Button>
  );
}
