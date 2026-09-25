import PreviewPage from "@/components/Pages/Preview";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface searchParams {
  id: string;
  origin: "journal" | "project";
}

const getPageDetails = async (origin: "journal" | "project", id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(
      origin === "journal"
        ? "personal_blogs_drafts"
        : "personal_projects_drafts",
    )
    .select(`id,title,content`)
    .single();
  if (error) {
    console.error(error);
  }
  if (!data) {
    console.error(data);
    console.error(error);
    return redirect("/404");
  }
  return data;
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<searchParams>;
}) {
  const { origin, id } = await searchParams;
  const data = await getPageDetails(origin, id);
  return <PreviewPage title={data.title ?? ""} content={data.content ?? ""} />;
}
