import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Grip, Check, Edit } from "@/components/icons";
import { Trash2 } from "lucide-react";
import { More } from "../icons";

import type { CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Task = {
  title: string;
  description?: string;
  category: string;
  status: string;
  dueDate: string;
  files?: string[];
};

function ListItem({ task }: { task: Task }) {
  const id = task.title;
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: id });

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  // console.log(new Date(task.dueDate.seconds));

  return (
    <div
      className="h-12 w-full  border-b flex gap-x-2 items-center px-2"
      ref={setNodeRef}
      style={style}
    >
      <div className="flex gap-x-2 md:gap-x-1 items-center w-full sm:w-3/4 md:w-2/5">
        <Checkbox className="size-4 border-black/60 shadow-none " />
        <button {...attributes} {...listeners} ref={setActivatorNodeRef}>
          <Grip className="hidden md:block" />
        </button>
        <Check />
        <span className="font-mulish font-medium text-sm w-full truncate ">
          {task.title}
        </span>
      </div>
      <div className="hidden sm:block sm:w-1/4 md:w-1/5">
        {new Date(task.dueDate?.seconds)
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("-")}
      </div>
      <div className="hidden md:block w-1/5">
        <Popover>
          <PopoverTrigger>
            <button className="h-7 bg-[#DDDADD] px-2 rounded-md">
              {task.status}
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="bg-[#fff9f9] border border-[#7B1984]/15 w-32 p-1 "
            align="center"
            alignOffset={20}
          >
            <div className="flex flex-col gap-y-2 ">
              <div className="font-mulish font-semibold text-sm h-6 hover:bg-[#ffe6e6] flex items-center w-full rounded-md p-1">
                TODO
              </div>
              <div className="font-mulish font-semibold text-sm h-6 hover:bg-[#ffe6e6] flex items-center w-full rounded-md p-1">
                IN-PROGRESS
              </div>
              <div className="font-mulish font-semibold text-sm h-6 hover:bg-[#ffe6e6] flex items-center w-full rounded-md p-1">
                COMPLETED
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="hidden md:flex w-1/5 justify-between pr-4">
        <span className="font-mulish text-sm font-medium">{task.category}</span>
        <Popover>
          <PopoverTrigger>
            <span>
              <More />
            </span>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-32 h-20 flex flex-col p-1 items-center justify-center bg-[#fff9f9]"
            sideOffset={-5}
          >
            <div className="font-mulish text-sm font-medium w-full  rounded-md hover:bg-[#ffe6e6]">
              <div className="flex gap-x-2 h-8  items-center px-2">
                <Edit />
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
    </div>
  );
}

export default ListItem;
