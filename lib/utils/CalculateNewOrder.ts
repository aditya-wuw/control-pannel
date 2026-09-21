import { ProjectsType } from "@/types/database";

export const calculateNewOrder = (
  items: ProjectsType[],
  draggedId: string,
  targetId: string,
): ProjectsType[] => {
  const draggedItem = items.find((i) => i.id === draggedId)!;
  const targetItem = items.find((i) => i.id === targetId)!;

  const updatedItems = items.map((item) => {
    if (item.isdraft) return { ...item, orderIndex: item.orderIndex };
    if (item.id === draggedId) {
      return { ...item, orderIndex: targetItem.orderIndex };
    }
    if (item.id === targetId) {
      return { ...item, orderIndex: draggedItem.orderIndex };
    }
    return item;
  });

  return updatedItems;
};
