SET local check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_journal_table_publish_status()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$Begin
  if not new.isdraft and old.isdraft then
      insert into personal_blogs select (new).*;
      delete from personal_blogs_drafts where id=new.id;
  elsif new.isdraft and not old.isdraft then
      insert into personal_blogs_drafts select (new).*;
      delete from personal_blogs where id=new.id;
  end if;
  return new;
end;$function$;

CREATE OR REPLACE FUNCTION public.update_projects_table_publish_status()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$Begin
  if not new.isdraft and old.isdraft then
      insert into personal_projects select (new).*;
      delete from personal_projects_drafts where id=new.id;
  elsif new.isdraft and not old.isdraft then
      insert into personal_projects_drafts select (new).*;
      delete from personal_projects where id=new.id;
  end if;
  return new;
end;$function$;

CREATE TRIGGER tigger_update_projects_public_status
  AFTER UPDATE ON public.personal_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_projects_table_publish_status();

CREATE TRIGGER tigger_update_projects_draft_status
  AFTER UPDATE ON public.personal_projects_drafts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_projects_table_publish_status();

CREATE POLICY "authenticated can delete project" ON "public"."personal_projects"
  FOR DELETE
  TO "authenticated"
  USING (true);

GRANT EXECUTE ON FUNCTION "public"."update_projects_table_publish_status"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";
