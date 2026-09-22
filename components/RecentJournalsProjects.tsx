"use client";

import { ContactsQuery, JournalType, ProjectsType } from "@/types/database";
import { Card } from "./ui/card";
import { ClockFading, ContactIcon } from "lucide-react";

interface props {
  RecentJournals: JournalType[];
  RecentProjects: ProjectsType[];
  RecentContacts: ContactsQuery[];
}

export default function RecentJournalsProjects({
  RecentJournals,
  RecentProjects,
  RecentContacts,
}: props) {
  return (
    <div className="w-full  mt-8">
      <div className="flex flex-col gap-4">
        <h1 className="flex-items gap-2">
          <ContactIcon size={16} />
          Recent contacts
        </h1>
        <Card className="p-4 w-full">
          {!RecentContacts || RecentContacts.length === 0 ? (
            <h1 className="opacity-80 text-sm flex-center p-10">
              {" "}
              no new contact queries to show
            </h1>
          ) : (
            <div></div>
          )}
        </Card>
      </div>

      <div className="flex flex-col gap-4 mt-5">
        <h1 className="flex-items gap-2">
          <ClockFading size={16} />
          Recent posts
        </h1>
        <Card className="p-4 mt-2 w-full">
          <h1 className="opacity-80 text-md">Recent Journals</h1>
          {!RecentJournals || RecentJournals.length === 0 ? (
            <h1 className="opacity-80 text-sm flex-center p-10">
              {" "}
              no new journals or drafts to show
            </h1>
          ) : (
            <div></div>
          )}
        </Card>
        <Card className="p-4 w-full">
          <h1 className="opacity-80 text-md">Recent projects</h1>
          {!RecentProjects || RecentProjects.length === 0 ? (
            <h1 className="opacity-80 text-sm flex-center p-10">
              {" "}
              no new projects or drafts to show
            </h1>
          ) : (
            <div></div>
          )}
        </Card>{" "}
      </div>
    </div>
  );
}
