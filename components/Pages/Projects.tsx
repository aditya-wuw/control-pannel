"use client";
import { toast } from "sonner";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ProjectsType } from "@/types/database";
import { Draftfilters } from "@/types/PageTypes";
import ProjectForm from "../Forms/Projects/ProjectForm";
import { ExternalLink, GripVertical, Trash } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { getFormatedDate } from "@/lib/utils/getFormatedDates";
import { calculateNewOrder } from "@/lib/utils/CalculateNewOrder";
import { UpdateOrderIndex } from "./Actions/Projects/UpdateOrderIndex";
import { updateProjectsPublishAction } from "./Actions/Projects/UpdatePublishStatus";
import { deleteSpecificRow } from "@/lib/supabase/Actions/deleteData";
import { LazyReload } from "@/lib/utils/Helpers";
import Link from "next/link";

interface ProjectsProps {
  ProjectsData: ProjectsType[];
}

const filterOptions: Draftfilters[] = ["Public", "Drafts"];

export default function Projects({ ProjectsData }: ProjectsProps) {
  const [pending, startTranstion] = useTransition();
  const [items, setItems] = useState<ProjectsType[]>(ProjectsData);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [Filter, setFilter] = useState<Draftfilters>("Public");

  const handleDelete = (title: string, id: string, isdraft: boolean) => {
    if (!isdraft) return;
    const yes = window.confirm(`Are you sure you want to delete, "${title}"`);
    if (!yes) return;
    startTranstion(async () => {
      const response = await deleteSpecificRow(
        isdraft ? "personal_projects_drafts" : "personal_projects",
        id,
      );
      if (!response.success) toast.error(response.message);
      toast.success(response.message);
      LazyReload(3000);
    });
  };

  const handleFilter = (target: Draftfilters) => {
    setFilter(target);
    switch (target) {
      case "Public":
        setItems(ProjectsData.filter((i) => i.isdraft === false));
        break;
      case "Drafts":
        setItems(ProjectsData.filter((i) => i.isdraft === true));
        break;
      default:
        setItems(ProjectsData.filter((i) => i.isdraft === false));
        toast.error("invalid option triggered");
        break;
    }
  };

  useEffect(() => {
    handleFilter("Public");
  }, []);

  const handleSaveStatus = (id: string, isdraft: boolean) => {
    startTranstion(async () => {
      const success = await updateProjectsPublishAction(id, isdraft);
      if (!success) toast.error("Failed to update publish status");
      toast.success(`Publish status updated for ${id}`);
      LazyReload(3000);
    });
  };

  // drag and drop orderindex change behaviour
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (
    e: React.DragEvent,
    targetId: string,
    draft: boolean,
  ) => {
    e.preventDefault();
    if (draft) return;
    if (!draggedId || draggedId === targetId) return;
    const updatedItems = calculateNewOrder(items, draggedId, targetId);
    setItems(updatedItems);
    const Updatestatus = await UpdateOrderIndex(updatedItems);
    if (!Updatestatus.success) {
      toast.error(Updatestatus.message);
    }
    toast.success(Updatestatus.message);
    setDraggedId(null);
  };

  const sortedItems = [...items].sort((a, b) =>
    Filter === "Drafts"
      ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      : a.orderIndex - b.orderIndex,
  );

  return (
    <div className="mt-5 px-4">
      <div className="text-xl flex justify-between items-center">
        <h1 className="flex items-center gap-2">Projects</h1>
        <div className="flex gap-2">
          <Button className="w-fit">
            <select
              onChange={(e) =>
                handleFilter(e.currentTarget.value as Draftfilters)
              }
              defaultValue={Filter}
              className="w-fit outline-none"
            >
              {filterOptions.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </Button>
          <ProjectForm />
        </div>
      </div>
      <div className="w-full mt-5 flex flex-col gap-5">
        <h1 className="text-end text-sm opacity-50">
          total {sortedItems.length} projects
        </h1>
        {sortedItems.length === 0 && (
          <h1 className="flex-center p-10 opacity-50">no projects found</h1>
        )}
        <div className="flex flex-col gap-3">
          {sortedItems.map((item) => (
            <Card
              key={item.id}
              draggable
              onDragStart={(e) => !item.isdraft && handleDragStart(e, item.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, item.id, item.isdraft ?? true)}
              className={`flex items-center gap-4 border p-3 rounded-xl shadow-sm transition-all
                    ${draggedId === item.id ? "opacity-50 scale-95 border-blue-500" : "opacity-100"}
                  `}
            >
              <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-700">
                {!item.isdraft && <GripVertical size={20} />}
              </div>
              <div className="flex-1 font-medium">
                <div className="flex flex-col gap-2">
                  <h1 className="font-bold">{item.title}</h1>
                  {
                    <Link
                      href={
                        item.isdraft
                          ? `/home/preview?origin=project&id=${item.id}`
                          : `${process.env.NEXT_PUBLIC_ORIGIN}/projects/${item.Link}`
                      }

                      target={item.isdraft ? "_self" : "_blank"}
                      className="flex-items gap-2 text-blue-500 underline text-sm"
                    >
                      <ExternalLink size={16} />
                      {item.Link}
                    </Link>
                  }
                  <h1 className="text-sm tracking-widest">
                    tags - {item.tags?.toLocaleString()}
                  </h1>
                </div>
                <div className="my-2 mt-4 flex justify-between gap-2">
                  <div className="flex items-end">
                    <h1>
                      created {getFormatedDate(new Date(item.created_at)) ?? ""}
                    </h1>
                  </div>
                  <div className="flex gap-2">
                    <ProjectForm
                      buttonTitle="Update project"
                      id={item.id}
                      FormState={{
                        success: false,
                        error: false,
                        values: {
                          title: item.title ?? "",
                          Description: item.Description ?? "",
                          AdditionalDescription:
                            item.AdditionalDescription ?? "",
                          Link: item.Link ?? "",
                          content: item.content ?? "",
                          isdraft: item.isdraft ? "Draft" : "Public",
                          tags: item.tags?.toString() ?? "",
                          githubLink: "",
                          projectLiveUrl: "",
                          videoDemo: item.DemoVideo ?? "",
                          image: item.image ?? "",
                        },
                        message: "",
                      }}
                    />
                    <Button
                      type="button"
                      disabled={pending}
                      onClick={() =>
                        handleSaveStatus(item.id, item.isdraft ?? true)
                      }
                      className={`${pending ? "opacity-50" : "opacity-100"}`}
                    >
                      {item.isdraft ? "Publish" : "Save as Draft"}
                    </Button>
                    {item.isdraft && (
                      <Button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            item.title ?? "",
                            item.id,
                            item.isdraft as boolean,
                          )
                        }
                        disabled={pending}
                        className="bg-red-500 text-white hover:bg-red-800"
                      >
                        <Trash />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
