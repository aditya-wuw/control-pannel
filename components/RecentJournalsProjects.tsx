"use client";

import { ContactsQuery, JournalType, ProjectsType } from "@/types/database";
import { Card } from "./ui/card";
import {
  ClockFading,
  ContactIcon,
  EarthIcon,
  ExternalLink,
  User2,
} from "lucide-react";
import { getFormatedDate } from "@/lib/utils/getFormatedDates";
import Link from "next/link";

interface props {
  RecentJournals: {
    id: string;
    title: string;
    published: string | null;
    updated: string | null;
  }[];
  RecentProjects: {
    id: string;
    title: string | null;
    Link: string | null;
    created_at: string;
  }[];
  RecentContacts: {
    id: string;
    SenderName: string;
    origin: string;
    status: string | null;
    created_at: string | null;
  }[];
}

export default function RecentJournalsProjects({
  RecentJournals,
  RecentProjects,
  RecentContacts,
}: props) {
  return (
    <div className="w-full  mt-8">
      <Link href={"/home/contacts"} className="flex flex-col gap-4">
        <h1 className="flex-items gap-2">
          <ContactIcon size={16} />
          Recent contacts
        </h1>
        <Card className="p-4 w-full">
          {!RecentContacts || RecentContacts.length === 0 ? (
            <h1 className="text-sm flex-center p-10 opacity-50">
              {" "}
              no new contact queries to show
            </h1>
          ) : (
            RecentContacts.sort((a, b) => {
              const a_created_at = new Date(a.created_at ?? "").getTime();
              const b_created_at = new Date(b.created_at ?? "").getTime();
              const sorted = b_created_at - a_created_at;
              return sorted;
            }).map((i) => (
              <div
                className="xl:p-3 p-2 flex max-xl:flex-col xl:justify-between"
                key={i.id}
              >
                <div className="grid grid-cols-3 grid-rows-1 gap-5 xl:w-[40%]">
                  <h1 className="flex-items gap-1.5 w-25">
                    <User2 size={16} />
                    {i.SenderName}
                  </h1>
                  <h1 className="flex-items gap-1.5 w-15">
                    <EarthIcon size={16} />
                    {i.origin}
                  </h1>
                  <h1 className="flex-center gap-1.5 bg-gray-900/40 p-2 rounded-2xl">
                    {i.status}
                  </h1>
                </div>
                <div className="flex-items gap-3 opacity-80 text-sm">
                  <h1>contacted</h1>
                  <h1 className="">
                    {getFormatedDate(new Date(i.created_at ?? "")) ?? ""}
                  </h1>
                </div>
              </div>
            ))
          )}
          <h1 className="text-blue-500/60 hover:text-blue-500 text-sm px-2">
            go to contacts
          </h1>
        </Card>
      </Link>

      <div className="flex flex-col gap-4 mt-5">
        <h1 className="flex-items gap-2">
          <ClockFading size={16} />
          Recently published
        </h1>
        <Card className="p-4 mt-2 w-full">
          <h1 className="opacity-80 text-md">Recent Journals</h1>
          {!RecentJournals || RecentJournals.length === 0 ? (
            <h1 className="text-sm flex-center p-10 opacity-50">
              {" "}
              no new journals to show
            </h1>
          ) : (
            <div>
              <div>
                {RecentJournals.map((i) => (
                  <div
                    key={i.id}
                    className="flex max-xl:flex-col xl:justify-between mt-2"
                  >
                    <div className="grid grid-cols-2 gap-10">
                      <h1 className="w-50  overflow-hidden">{i.title}</h1>
                      <div className="relative z-100 flex-items text-nowrap gap-2 underline text-blue-500 overflow-hidden text-ellipsis">
                        <ExternalLink size={16} />
                        {i.id}
                      </div>
                    </div>
                    <div>
                      <h1 className="text-sm opacity-50">
                        {getFormatedDate(
                          new Date(i.updated ? i.updated : (i.published ?? "")),
                        ) ?? ""}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Link href={"/home/journals"}>
            <h1 className="text-blue-500/60 hover:text-blue-500 text-sm px-2">
              go to journals
            </h1>
          </Link>
        </Card>
        <Card className="p-4 w-full">
          <h1 className="opacity-80 text-md">Recent projects</h1>
          {!RecentProjects || RecentProjects.length === 0 ? (
            <h1 className="text-sm flex-center p-10 opacity-50">
              {" "}
              no new projects to show
            </h1>
          ) : (
            <div className="p-3">
              {RecentProjects.map((i) => (
                <div
                  key={i.id}
                  className="flex max-xl:flex-col xl:justify-between mt-2"
                >
                  <div className="grid grid-cols-2 gap-10">
                    <h1 className="w-50  overflow-hidden">{i.title}</h1>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_ORIGIN}/projects/${i.Link}`}
                      target="_blank"
                      className="relative z-100 flex-items text-nowrap gap-2 underline text-blue-500 overflow-hidden text-ellipsis"
                    >
                      <ExternalLink size={16} />
                      {i.Link}
                    </Link>
                  </div>
                  <div>
                    <h1 className="text-sm opacity-50">
                      {getFormatedDate(new Date(i.created_at)) ?? ""}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link href={"/home/projects"}>
            <h1 className="text-blue-500/60 hover:text-blue-500 text-sm px-2">
              go to projects
            </h1>
          </Link>
        </Card>
      </div>
    </div>
  );
}
