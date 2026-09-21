import { BookCheck, ContactIcon, NotebookPen } from "lucide-react";
import { Card } from "./ui/card";
import Link from "next/link";

interface dashboardProps {
  TotalProjects: number;
  TotalJournals: number;
  ContactPending: number;
}

export default function Dashboard({
  TotalProjects,
  TotalJournals,
  ContactPending,
}: dashboardProps) {
  const ICON_SIZE = 16;
  return (
    <div className="flex gap-2">
      <Card className="xl:p-4 p-2 w-1/2">
        <Link href={"/home/projects"}>
          <h1 className="flex items-center gap-2 xl:text-sm text-sm pb-2">
            <BookCheck size={ICON_SIZE} />
            Projects
          </h1>
          <div className="font-mono">{TotalProjects}</div>
        </Link>
      </Card>
      <Card className="xl:p-4 p-2 w-1/2">
        <Link href={"/home/journals"}>
          <h1 className="flex items-center gap-2 xl:text-sm text-sm pb-2">
            <NotebookPen size={ICON_SIZE} />
            Journals
          </h1>
          <div className="font-mono">{TotalJournals}</div>
        </Link>
      </Card>
      <Card className="xl:p-4 p-2 w-1/2">
        <Link href={"/home/contacts"}>
          <h1 className="flex items-center gap-2 xl:text-sm text-sm pb-2">
            <ContactIcon size={ICON_SIZE} />
            Contacts
          </h1>
          <div className="font-mono">{ContactPending}</div>
        </Link>
      </Card>
    </div>
  );
}
