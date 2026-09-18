import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import Settings from "./Settings";
import { ThemeSwitcher } from "./theme-switcher";

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getUser();
  const user_id = data?.user?.id;
  const { data: userName, error } = await supabase
    .from("users")
    .select("full_name")
    .eq("id", user_id)
    .single();

  return user_id ? (
    <div className="flex items-center gap-4">
      <ThemeSwitcher />
      <Settings user_name={userName?.full_name} />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/">Login</Link>
      </Button>
    </div>
  );
}
