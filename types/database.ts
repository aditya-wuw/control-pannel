import { Database } from "@/database.types";

export type TablesTypes = keyof Database["public"]["Tables"];
export type ContactsQuery =
  Database["public"]["Tables"]["contact_queries"]["Row"];
export type ProjectsType =
  Database["public"]["Tables"]["personal_projects"]["Row"];
export type ProjectsDraftsType =
  Database["public"]["Tables"]["personal_projects_drafts"]["Row"];
export type JournalType = Database["public"]["Tables"]["personal_blogs"]["Row"];
export type JournalDraftsType =
  Database["public"]["Tables"]["personal_blogs_drafts"]["Row"];
  
export interface ErrorPromiose {
  success: boolean;
  message: string;
}
