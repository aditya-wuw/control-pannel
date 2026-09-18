import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Dashboard from "@/components/ui/Dashboard";

async function getCountDetails() {
  const supabase = await createClient();
  try {
    const { count: ProjectsCount } = await supabase
      .from("personal_projects")
      .select("*", { count: "exact", head: true });
    const { count: JournalCount } = await supabase
      .from("personal_blogs")
      .select("*", { count: "exact", head: true });
    const { count: ContactCount } = await supabase
      .from("contact_queries")
      .select("*", { count: "exact", head: true });

    return {
      TotalProjects: ProjectsCount,
      TotalJournals: JournalCount,
      TotalContacts: ContactCount,
    };
  } catch (e) {
    console.log(`Failed to fetch counts : Error [${e}]`);
    return null;
  }
}

export default async function ProtectedPage() {
  const Counts = await getCountDetails();
  return (
    <div className="flex-1 w-full flex flex-col gap-12 pt-4">
      <Dashboard
        TotalProjects={Counts?.TotalProjects ?? 0}
        TotalJournals={Counts?.TotalJournals ?? 0}
        ContactPending={Counts?.TotalContacts ?? 0}
      />
    </div>
  );
}
