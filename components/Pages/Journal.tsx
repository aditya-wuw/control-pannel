"use client";
import { JournalDraftsType, JournalType } from "@/types/database";
import { Notebook } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState, useTransition } from "react";
import { Card } from "../ui/card";
import { toast } from "sonner";
import { UpdatePublishAction } from "./Actions/Journals/UpdatePublishStatus";
import { useRouter } from "next/navigation";
import JournalForm from "../Forms/Journal/JournalForm";
import { Draftfilters } from "@/types/PageTypes";

interface JournalProps {
  Journals: JournalType[];
}

const filterOptions: Draftfilters[] = ["all", "Public", "Drafts"];
const publishOptions = ["Public", "Drafts"];
export default function Journal({ Journals }: JournalProps) {
  const router = useRouter();
  const [ActionSuccess, setActionSuccess] = useState(false);
  const [JournalsState, setJournals] = useState(Journals);
  const [pending, startTransition] = useTransition();
  const [ShowJournalsbyFilter, setShowJournalsbyFilter] =
    useState<Draftfilters>("all");

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

  useEffect(() => {
    if (ActionSuccess) {
      router.refresh();
      console.log("Refershing");
    }
  }, [ActionSuccess]);

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
      <div className="text-xl flex justify-between items-center">
        <h1 className="flex items-center gap-2">
          <Notebook size={20} />
          Journals
        </h1>
        <div className="flex gap-2">
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
      <div className="w-full mt-5 flex flex-col gap-5">
        {JournalsState.length === 0 ? (
          <h1 className="flex-center mt-10 opacity-70">
            no Journals available
          </h1>
        ) : (
          JournalsState.map((i) => (
            <Card className="w-full p-4" key={i.id}>
              <div>
                <h1>{i.title}</h1>
              </div>
              <div className="flex justify-end gap-2">
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
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
