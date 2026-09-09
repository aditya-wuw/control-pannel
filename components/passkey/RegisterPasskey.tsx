"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function RegisterPassKey() {
  const [hasPassKey, sethasPassKey] = useState(true);

  const checkPasskey = async () => {
    const supabase = createClient();
    const { data: Passkey, error } = await supabase.auth.passkey.list();
    // console.log(Passkey);
    sethasPassKey(Passkey ? Passkey?.length > 0 : false);
    if (error) return toast.error(`Failed to get user data [${error.code}]`);
  };

  const handleRegister = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.registerPasskey();
    if (error || !data) return toast.error(`${error.message}`);
    if (data) toast.success(`registered with ${data.friendly_name}`);
  };

  useEffect(() => {
    checkPasskey();
  }, []);

  if (hasPassKey)
    return (
      <Button type="button" className="opacity-70">
        Device Registered
      </Button>
    );
  return <Button onClick={handleRegister}>Register this device</Button>;
}
