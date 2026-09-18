# Control Pannel
This is my control pannel for manageing my database and updating my projects and journals

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Use `cd` to change into the app's directory

3. Rename `.env.example` to `.env.local` and update the following:

```env
NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=[INSERT SUPABASE PROJECT API PUBLISHABLE OR ANON KEY]
```

> [!NOTE]
> This example uses `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, which refers to Supabase's new **publishable** key format.
> Both legacy **anon** keys and new **publishable** keys can be used with this variable name during the transition period. Supabase's dashboard may show `NEXT_PUBLIC_SUPABASE_ANON_KEY`; its value can be used in this example.
> See the [full announcement](https://github.com/orgs/supabase/discussions/29260) for more information.

Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` can be found in [your Supabase project's API settings](https://supabase.com/dashboard/project/_?showConnect=true)

4. You can now run the Next.js local development server:

   ```bash
   pnpm run dev
   ```

   It now be running on [localhost:3000](http://localhost:3000/).


migrations for table schemas are not provided you'll have to create and update with your own table names and data
## Feedback and issues

Please file feedback and issues over on [GitHub](https://github.com/aditya-wuw/control-pannel/issues).
