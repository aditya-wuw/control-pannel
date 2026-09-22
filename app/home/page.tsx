import { createClient } from "@/lib/supabase/server";
import Dashboard from "@/components/Dashboard";
import JournalForm from "@/components/Forms/Journal/JournalForm";
import Toast from "@/components/Toast";
import ProjectForm from "@/components/Forms/Projects/ProjectForm";
import { LayoutDashboard, Plus } from "lucide-react";
import RecentJournalsProjects from "@/components/RecentJournalsProjects";
import { ContactsQuery, JournalType, ProjectsType } from "@/types/database";

async function getCountDetails() {
  const supabase = await createClient();
  try {
    const { count: ProjectsCount } = await supabase
      .from("personal_projects")
      .select("*", { count: "exact", head: true });
    const { count: ProjectsDraftsCount } = await supabase
      .from("personal_projects_drafts")
      .select("*", { count: "exact", head: true });
    const { count: JournalCount } = await supabase
      .from("personal_blogs")
      .select("*", { count: "exact", head: true });
    const { count: JournalDraftsCount } = await supabase
      .from("personal_blogs_drafts")
      .select("*", { count: "exact", head: true });
    const { count: ContactCount } = await supabase
      .from("contact_queries")
      .select("*", { count: "exact", head: true });

    return {
      TotalProjects: (ProjectsCount ?? 0) + (ProjectsDraftsCount ?? 0),
      TotalJournals: (JournalCount ?? 0) + (JournalDraftsCount ?? 0),
      TotalContacts: ContactCount,
    };
  } catch (e) {
    console.log(`Failed to fetch counts : Error [${e}]`);
    return null;
  }
}

const getRecentEvents = async () => {
  const supabase = await createClient();
  const { data: ContactsData, error: ContactsFetchError } = await supabase
    .from("contact_queries")
    .select("id,SenderName,origin,status,created_at")
    .range(0, 3);

  const { data: Projects, error: ProjectsFetchError } = await supabase
    .from("personal_projects")
    .select("id,title,Link,created_at")
    .range(0, 3);

  const { data: Journals, error: JournalsFetchError } = await supabase
    .from("personal_blogs")
    .select("id,title,published,updated")
    .range(0, 3);

  const error = ContactsFetchError || ProjectsFetchError || JournalsFetchError;

  if (error) {
    console.error(error.message);
  }

  // console.log(Projects, Journals);
  return {
    contacts: ContactsData ?? [],
    projects: Projects ?? [],
    journals: Journals ?? [],
  };
};

export default async function ProtectedPage() {
  const Counts = await getCountDetails();
  const { contacts, journals, projects } = await getRecentEvents();
  return (
    <div className="relative flex-1 w-full flex flex-col pt-4 px-4 pb-5">
      <Toast />
      <h1 className="mb-4 flex items-center gap-2">
        <LayoutDashboard size={16} />
        Dashboard
      </h1>
      <Dashboard
        TotalProjects={Counts?.TotalProjects ?? 0}
        TotalJournals={Counts?.TotalJournals ?? 0}
        ContactPending={Counts?.TotalContacts ?? 0}
      />
      <h1 className="mt-10 flex items-center gap-2">
        <Plus size={16} />
        Create Somthing
      </h1>
      <div className="w-full flex gap-3 mt-5">
        <JournalForm />
        <ProjectForm />
      </div>
      <RecentJournalsProjects
        RecentJournals={journals}
        RecentProjects={projects}
        RecentContacts={contacts}
      />
    </div>
  );
}
