import Journal from "@/components/Pages/Journal";
import { selectAll } from "@/lib/supabase/Actions/getData";

export default async function page() {
  let PublicJournals = await selectAll("personal_blogs");
  let JournalDrafts = await selectAll("personal_blogs_drafts");

  const safePublic = Array.isArray(PublicJournals) ? PublicJournals : [];
  const safeDrafts = Array.isArray(JournalDrafts) ? JournalDrafts : [];
  const Journals = [...safePublic, ...safeDrafts];

  return <Journal Journals={Journals} />;
}
