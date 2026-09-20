"use client";
import { ContactsQuery } from "@/types/database";
import { Card } from "../ui/card";
import { Contact, Mail, User } from "lucide-react";
import { getFormatedDate } from "@/lib/utils/getFormatedDates";
import { Button } from "../ui/button";
import { useState } from "react";

interface ContactsProps {
  Contacts: ContactsQuery[];
}
type origin = "adi" | "smug" | "all";
type status = "pending" | "contacted" | "ignore";
const statusOptions: status[] = ["pending", "contacted", "ignore"];
const filterOptions: origin[] = ["all", "adi", "smug"];

export default function Contacts({ Contacts }: ContactsProps) {
  const ICON_SIZE = 16;

  const handleUpdateState = (id: string) => {};

  if (Contacts.length === 0 || !Contacts)
    return (
      <h1 className="flex justify-center mt-10 opacity-60">no contacts</h1>
    );

  return (
    <div className="mt-5 px-4">
      <div className="text-xl flex justify-between gap-2 items-center">
        <h1 className="flex items-center gap-2">
          <Contact size={20} />
          Contacts
        </h1>
        <Button>
          <select
            defaultValue={filterOptions[0]}
            className="w-fit outline-none"
          >
            {filterOptions.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </Button>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        {Contacts.sort((a, b) => {
          if (a.created_at && b.created_at)
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          else return 0;
        }).map((i) => {
          return (
            <Card key={i.id} className="p-4 px-5 w-full h-fit">
              <div className="flex justify-between">
                <div className="gap-4">
                  <h1 className="flex items-center gap-2 text-lg">
                    <User size={ICON_SIZE} />
                    {i.SenderName}
                  </h1>
                  <h3 className="flex items-center gap-2">
                    <Mail size={ICON_SIZE} />
                    <a
                      href={`mailto:${i.email}`}
                      className="opacity-70  max-md:text-xs overflow-y-hidden text-ellipsis lg:w-full w-[90%]"
                    >
                      {i.email}
                    </a>
                  </h3>
                </div>
                {i.created_at && (
                  <h1 className="max-md:text-xs">
                    {getFormatedDate(new Date(i.created_at)) ?? ""}
                  </h1>
                )}
              </div>
              <p className="lg:mt-2 mt-3 max-md:text-sm">{i.message}</p>
              <div className="flex justify-end">
                <Button>
                  <select
                    defaultValue={i.status as string}
                    onChange={() => handleUpdateState(i.id)}
                    className="w-fit outline-none"
                  >
                    {statusOptions.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
