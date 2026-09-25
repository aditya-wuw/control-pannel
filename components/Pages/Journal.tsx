"use client";
import { JournalType } from "@/types/database";
import { ExternalLink, Notebook, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { Card } from "../ui/card";
import { toast } from "sonner";
import { UpdatePublishAction } from "./Actions/Journals/UpdatePublishStatus";
import { useRouter } from "next/navigation";
import JournalForm from "../Forms/Journal/JournalForm";
import { Draftfilters } from "@/types/PageTypes";
import { getFormatedDate } from "@/lib/utils/getFormatedDates";
import { deleteSpecificRow } from "@/lib/supabase/Actions/deleteData";
import { LazyReload } from "@/lib/utils/Helpers";
import Link from "next/link";

interface JournalProps {
  Journals: JournalType[];
}

const filterOptions: Draftfilters[] = ["all", "Public", "Drafts"];
const publishOptions = ["Public", "Drafts"];
export default function Journal({ Journals }: JournalProps) {
  const router = useRouter();
  const [JournalsState, setJournals] = useState(Journals);
  const [pending, startTransition] = useTransition();
  const [ShowJournalsbyFilter, setShowJournalsbyFilter] =
    useState<Draftfilters>("all");

  const handleDelete = (title: string, id: string, isdraft: boolean) => {
    const yes = window.confirm(`Are you sure you want to delete, "${title}"`);
    if (!yes) return;
    startTransition(async () => {
      const response = await deleteSpecificRow(
        isdraft ? "personal_blogs_drafts" : "personal_blogs",
        id,
      );
      if (!response.success) toast.error(response.message);
      toast.success(response.message);
      LazyReload(3000);
    });
  };

  const handleStatusUpdate = (id: string, isDraft: boolean) => {
    startTransition(async () => {
      const update = await UpdatePublishAction(id, isDraft);
      if (!update.success) {
        toast.error(update.message);
      }
      toast.success(update.message);
      router.refresh();
    });
  };

  const handleFilter = (target: Draftfilters) => {
    setShowJournalsbyFilter(target);
    switch (target) {
      case "all":
        setJournals(Journals);
        break;
      case "Public":
        const Public = Journals.filter((i) => i.isdraft === false);
        setJournals(Public);
        break;
      case "Drafts":
        const Final = Journals.filter((i) => i.isdraft === true);
        setJournals(Final);
        break;
      default:
        setJournals(Journals);
        break;
    }
  };

  return (
    <div className="mt-5 px-4">
      <div className="text-xl xl:flex justify-between items-center">
        <h1 className="flex items-center gap-2">
          <Notebook size={20} />
          Journals
        </h1>
        <div className="mt-4 xl:mt-0 flex gap-2">
          <Button className="w-fit">
            <select
              onChange={(e) =>
                handleFilter(e.currentTarget.value as Draftfilters)
              }
              defaultValue={ShowJournalsbyFilter}
              className="w-fit outline-none"
            >
              {filterOptions.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </Button>
          <JournalForm />
        </div>
      </div>
      <h1 className="xl:text-end text-sm opacity-50 mt-5">
        total {JournalsState.length} journals
      </h1>
      <div className="w-full mt-5 flex flex-col gap-5">
        {JournalsState.length === 0 ? (
          <h1 className="flex-center mt-10 opacity-70">
            no Journals available
          </h1>
        ) : (
          JournalsState.sort((a, b) => {
            const a_published = new Date(a.published ?? "").getTime();
            const b_published = new Date(b.published ?? "").getTime();
            const sorted = b_published - a_published;
            return sorted;
          }).map((i) => (
            <Card className="w-full p-4" key={i.id}>
              <div className="flex justify-between gap-2">
                <div>
                  <h1 className="text-md">{i.title}</h1>
                  <Link
                    href={
                      i.isdraft
                        ? `/home/preview?origin=journal&id=${i.id}`
                        : `${process.env.NEXT_PUBLIC_ORIGIN}/journal/${i.id}`
                    }
                    target={i.isdraft ? "_self" : "_blank"}
                    className="mt-2 flex-items gap-2 text-blue-500 underline opacity-90 hover:opacity-100 text-sm"
                  >
                    <ExternalLink size={16} />
                    {i.id}
                  </Link>
                </div>
              </div>
              <div className="flex xl:flex-row flex-col xl:justify-between gap-2">
                <div className="flex xl:flex-row flex-col xl:gap-2 mt-4 text-sm">
                  {i.updated && (
                    <span className="opacity-70">
                      {i.isdraft ? "drafted" : "updated"}{" "}
                      {getFormatedDate(new Date(i.updated)) ?? ""}
                      <span className="mx-1 xl:opacity-100 opacity-0">•</span>
                    </span>
                  )}

                  <h1 className="opacity-70">
                    published{" "}
                    {getFormatedDate(new Date(i.published ?? "")) ?? ""}
                  </h1>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <select
                      defaultValue={i.isdraft ? "Drafts" : "Public"}
                      onChange={(e) =>
                        handleStatusUpdate(
                          i.id,
                          e.currentTarget.value === "Drafts",
                        )
                      }
                      disabled={pending}
                      className="w-fit outline-none"
                    >
                      {publishOptions.map((i) => (
                        <option key={i}>{i}</option>
                      ))}
                    </select>
                  </Button>
                  {
                    <JournalForm
                      buttonTitle={"Update"}
                      id={i.id}
                      FormState={{
                        success: false,
                        error: false,
                        message: "",
                        values: {
                          title: i.title,
                          content: i.content,
                          shortDescription: i.shortDescription,
                          banner: i.banner ?? "",
                        },
                      }}
                    />
                  }
                  <Button
                    type="button"
                    onClick={() =>
                      handleDelete(i.title, i.id, i.isdraft ?? true)
                    }
                    disabled={pending}
                    className="bg-red-500 text-white hover:bg-red-800"
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
