import PreviewPage from "@/components/Pages/Preview";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const getPageContent = () => {};

const markdownString = `# Project Overview

Welcome to the **Project Phoenix** documentation. This file provides a brief overview of our *core* objectives.

## Key Deliverables

1. Initial system architecture design
2. Database schema creation
3. API endpoint integration

### Tech Stack

*   **Frontend:** React, TailwindCSS
*   **Backend:** Node.js, Express
*   **Database:** PostgreSQL, Supabase

## Notes and References

> "Quality is not an act, it is a habit." — Aristotle

For more details, refer to the [official documentation](https://example.com/docs).

### Sample Configuration

\`\`\`json
{
  "project_name": "Phoenix",
  "version": "1.0.0",
  "private": true
}
\`\`\`
`;

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
  console.log(data);
  return <PreviewPage title={data.title ?? ""} content={data.content ?? ""} />;
}
