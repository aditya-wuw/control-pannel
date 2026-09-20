import Contacts from "@/components/Pages/Contacts";
import { selectAll } from "@/lib/supabase/Actions/getData";
import { toast } from "sonner";

export default async function page() {
  const contacts = await selectAll("contact_queries");
  if (!Array.isArray(contacts)) {
    toast.error(contacts.message);
    return <Contacts Contacts={[]} />;
  } else {
    return <Contacts Contacts={contacts} />;
  }
}
