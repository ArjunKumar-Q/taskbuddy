import { MoreHorizontalIcon, Trash2 } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Edit } from "../icons";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";
import { Task } from "../List/ListItem";
import { cn } from "@/lib/utils";

const BoardItem = ({ task }: { task: Task }) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.title });

  console.log(transition);

  const style: CSSProperties = {
    opacity: isDragging ? 0 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      className={cn(
        "w-full h-28 bg-white rounded-xl border border-[#58575128] flex flex-col justify-between px-3 pt-3 pb-1 my-2 ",
        isDragging && "shadow-md"
      )}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="w-full  flex justify-between items-center ">
        <span
          className={cn(
            "font-mulish font-bold text-base",
            task.status.toLowerCase() === "completed" && "line-through"
          )}
        >
          {task.title}
        </span>
        <Popover>
          <PopoverTrigger>
            <MoreHorizontalIcon className="size-4" />
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-32 h-20 flex flex-col p-1 items-center justify-center bg-[#fff9f9]"
          >
            <div className="font-mulish text-sm font-medium w-full  rounded-md hover:bg-[#ffe6e6]">
              <div className="flex gap-x-2 h-8  items-center px-2">
                <Edit className="size-4" />
                <span className="font-mulish font-semibold text-black">
                  Edit
                </span>
              </div>
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
