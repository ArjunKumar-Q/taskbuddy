import { MoreHorizontalIcon, Trash2, GripHorizontal } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Task } from "../List/ListItem";
import { cn } from "@/lib/utils";
import TaskEditor from "../Task/EditTask";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";
import useTask from "@/hooks/useTask";
import { useQueryClient } from "@tanstack/react-query";

const BoardItem = ({
  task,
  overlay = false,
}: {
  task: Task;
  overlay: boolean;
}) => {
  const [state, dispatch] = useTask();
  const queryClient = useQueryClient();
  const { searchQuery, dueDate, category } = state;
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.title });

  const style: CSSProperties = {
    opacity: isDragging ? 0 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      className={cn(
        "w-full h-28 bg-white rounded-xl border border-[#58575128] flex flex-col justify-between px-3 pt-3 pb-1 my-2 group",
        isDragging && "shadow-md cursor-grabbing",
        searchQuery !== undefined &&
          !task.title?.includes(searchQuery) &&
          "hidden",
        category !== undefined && category !== task.category && "hidden",
        dueDate !== undefined && dueDate !== task.dueDate && "hidden"
      )}
      ref={setNodeRef}
      style={style}
    >
      <div className="w-full  flex justify-between items-center ">
        <span
          className={cn(
            "font-mulish font-bold text-base",
            (task?.status as string).toLowerCase() === "completed" &&
              "line-through"
          )}
        >
          {task.title}
        </span>

        <div className="flex gap-x-5">
          <div
            {...attributes}
            {...listeners}
            className={cn(
              "text-[#a7a7a7] cursor-grab",
              overlay && "cursor-grabbing"
            )}
          >
            <GripHorizontal className={cn("size-4 ")} />
          </div>
          <Popover>
            <PopoverTrigger onClick={() => console.log("clicked")}>
              <MoreHorizontalIcon className="size-4" />
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-32 h-20 flex flex-col p-1 items-center justify-center bg-[#fff9f9]"
            >
              <div className="font-mulish text-sm font-medium w-full  rounded-md hover:bg-[#ffe6e6]">
                <TaskEditor task={task} />
              </div>
              <div className="font-mulish text-sm font-medium w-full  rounded-md hover:bg-[#ffe6e6]">
                <div className="flex gap-x-2 h-8  items-center px-2">
                  <Trash2 className="size-4 text-[#DA2F2F]" />
                  <span className="font-mulish font-semibold text-[#DA2F2F]">
                    Delete
                  </span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="h-auto flex justify-between items-center">
        <span className="text-[10px] font-mulish font-semibold text-[#7a7a7a]">
          {task.category}
        </span>
        <span className="text-[10px] font-mulish font-semibold text-[#7a7a7a]">
          {task.dueDate}
        </span>
      </div>
    </div>
  );
};

export default BoardItem;
