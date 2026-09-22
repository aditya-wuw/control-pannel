"use client";
import { ContactsQuery } from "@/types/database";
import { Card } from "../ui/card";
import { Contact, Mail, User } from "lucide-react";
import { getFormatedDate } from "@/lib/utils/getFormatedDates";
import { Button } from "../ui/button";
import { useActionState, useState, useTransition } from "react";
import { UpdateContactAction } from "./Actions/Journals/UpdateContactStatus";
import { toast } from "sonner";
import Toast from "../Toast";
import { useRouter } from "next/navigation";
import { Contactsfilters, origin, status } from "@/types/PageTypes";

interface ContactsProps {
  Contacts: ContactsQuery[];
}

const statusOptions: status[] = ["pending", "contacted", "ignore"];
const filterOptions: Contactsfilters[] = [
  "all",
  "adi",
  "smug",
  ...statusOptions,
];

export default function Contacts({ Contacts }: ContactsProps) {
  const ICON_SIZE = 16;
  const router = useRouter();
  const [ContactsState, setContacts] = useState(Contacts);
  const [pending, startTransition] = useTransition();

  const handleStatusUpdate = async (id: string, status: status) => {
    startTransition(async () => {
      const state = await UpdateContactAction(id, status);
      if (!state.success) toast.error(state.message);
      toast.success(state.message);
      router.refresh();
    });
  };

  const handleFilter = (target: Contactsfilters) => {
    if (target === "all") return setContacts(Contacts);
    if (statusOptions.includes(target as status)) {
      const Targets = Contacts.filter((item) => item.status === target);
      return setContacts(Targets);
    }
    const Targets = Contacts.filter((item) => item.origin === target);
    setContacts(Targets);
  };

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
            onChange={(e) => handleFilter(e.currentTarget.value as origin)}
            defaultValue={filterOptions[0]}
            className="w-fit outline-none"
          >
            {filterOptions.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </Button>
      </div>
      <h1 className="text-end text-sm opacity-50 mt-5">
        total {ContactsState.length} contacts
      </h1>
      <div className="mt-5 flex flex-col gap-3">
        {ContactsState.sort((a, b) => {
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
                  <h3 className="flex items-center gap-2 opacity-60">
                    origin - {i.origin}
                  </h3>
                </div>
                {i.created_at && (
                  <h1 className="max-md:text-xs">
                    {getFormatedDate(new Date(i.created_at)) ?? ""}
                  </h1>
                )}
              </div>
              <p className="lg:mt-2 mt-3 max-md:text-sm">{i.message}</p>
              <div className="flex justify-end gap-2">
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(i.email);
                    toast.success(`copied ${i.email}`);
                  }}
                >
                  Contact
                </Button>
                <Button>
                  <select
                    defaultValue={i.status as string}
                    onChange={(e) =>
                      handleStatusUpdate(i.id, e.currentTarget.value as status)
                    }
                    disabled={pending}
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
