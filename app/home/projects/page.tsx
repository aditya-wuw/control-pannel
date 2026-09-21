import Projects from "@/components/Pages/Projects";
import { selectAll } from "@/lib/supabase/Actions/getData";

export default async function page() {
  let PublicProjects = await selectAll("personal_projects");
  let DraftProjects = await selectAll("personal_projects_drafts");

  const safePublic = Array.isArray(PublicProjects) ? PublicProjects : [];
  const safeDrafts = Array.isArray(DraftProjects) ? DraftProjects : [];
  const Data = [...safePublic, ...safeDrafts];

  return <Projects ProjectsData={Data} />;
}
