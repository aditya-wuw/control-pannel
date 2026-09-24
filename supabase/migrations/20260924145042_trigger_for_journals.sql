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

CREATE TRIGGER trigger_update_journal_publish_status
  AFTER UPDATE ON public.personal_blogs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_journal_table_publish_status();

CREATE TRIGGER trigger_update_journal_drafts
  AFTER UPDATE ON public.personal_blogs_drafts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_journal_table_publish_status();

CREATE POLICY "authenticated can update" ON "public"."personal_blogs"
  FOR UPDATE
  TO "authenticated"
  USING (true);

GRANT EXECUTE ON FUNCTION "public"."update_journal_table_publish_status"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";
