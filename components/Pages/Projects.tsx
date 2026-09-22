"use client";
import { ProjectsType } from "@/types/database";
import { Button } from "../ui/button";
import ProjectForm from "../Forms/Projects/ProjectForm";
import { Draftfilters } from "@/types/PageTypes";
import { Card } from "../ui/card";
import { ExternalLink, GripVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { calculateNewOrder } from "@/lib/utils/CalculateNewOrder";
import { UpdateOrderIndex } from "./Actions/Projects/UpdateOrderIndex";
import { getFormatedDate } from "@/lib/utils/getFormatedDates";

interface ProjectsProps {
  ProjectsData: ProjectsType[];
}

const filterOptions: Draftfilters[] = ["Public", "Drafts"];

export default function Projects({ ProjectsData }: ProjectsProps) {
  const [items, setItems] = useState<ProjectsType[]>(ProjectsData);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [Filter, setFilter] = useState<Draftfilters>("Public");

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
                  {!item.isdraft && (
                    <a
                      href={`https://adi.smgcat.site/projects/${item.Link}`}
                      target="_blank"
                      className="flex-items gap-2 text-blue-500 underline text-sm"
                    >
                      <ExternalLink size={16} />
                      {item.Link}
                    </a>
                  )}
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
                    <Button>
                      {item.isdraft ? "Publish" : "Save as Draft"}
                    </Button>
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
