"use client";
import { JournalDraftsType, JournalType } from "@/types/database";
import Toast from "../Toast";
import { Notebook } from "lucide-react";
import { Button } from "../ui/button";
import { filters } from "@/types/Pages/JournalPage";
import { useState, useTransition } from "react";
import { Card } from "../ui/card";
import { toast } from "sonner";
import { UpdatePublishAction } from "./Actions/UpdatePublishStatus";
import { useRouter } from "next/navigation";
import JournalForm from "../Forms/Journal/JournalForm";

interface JournalProps {
  Journals: JournalType[];
}

const filterOptions: filters[] = ["all", "Public", "Drafts"];
const publishOptions = ["Public", "Drafts"];
export default function Journal({ Journals }: JournalProps) {
  const router = useRouter();
  const [JournalsState, setJournals] = useState(Journals);
  const [pending, startTransition] = useTransition();
  const [ShowJournalsbyFilter, setShowJournalsbyFilter] =
    useState<filters>("all");

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

  const handleFilter = (target: filters) => {
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
    <div className="relative inset-0 mt-5 px-4 bg-red-500">
      <Toast />

      <div className="text-xl w-full flex justify-between gap-35 items-center">
        <h1 className="flex items-center gap-2">
          <Notebook size={20} />
          Journals
        </h1>
        <div className="flex gap-2">
          <Button className="w-fit">
            <select
              onChange={(e) => handleFilter(e.currentTarget.value as filters)}
              defaultValue={ShowJournalsbyFilter}
              className="w-fit outline-none"
            >
              {filterOptions.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </Button>
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
