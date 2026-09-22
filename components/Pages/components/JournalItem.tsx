import { Card } from "@/components/ui/card";
import { getFormatedDate } from "@/lib/utils/getFormatedDates";
import { JournalType } from "@/types/database";
import { ExternalLink } from "lucide-react";

interface JournalItemsProps {
  item: JournalType;
}

export default function JournalItems({ item }: JournalItemsProps) {
  return (
    <Card className="w-full p-4" key={item.id}>
      <div className="flex justify-between gap-2">
        <div>
          <h1>{item.title}</h1>
          <a
            href={`https://adi.smgcat.site/journal/${item.id}`}
            target="_blank"
            className="mt-2 flex-items gap-2 text-blue-500 underline opacity-90 hover:opacity-100 text-sm"
          >
            <ExternalLink size={16} />
            {item.id}
          </a>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <div className="flex gap-2 mt-4 text-sm">
          {item.updated && (
            <span className="opacity-70">
              updated {getFormatedDate(new Date(item.updated)) ?? ""}
              <span className="mx-1">•</span>
            </span>
          )}

          <h1 className="opacity-70">
            published {getFormatedDate(new Date(item.published ?? "")) ?? ""}
          </h1>
        </div>
      </div>
    </Card>
  );
}
