import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "../ui/accordion";
import { cn } from "@/lib/utils";

import { useState } from "react";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";
import ListItem from "./ListItem";
import { DndContext } from "@dnd-kit/core";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { setDate } from "date-fns";
import { Calender, Enter } from "../icons";

export function ListContainer({
  title,
  isTodoContainer,
  bgColor,
  caretColor,
}: {
  title: string;
  isTodoContainer?: boolean;
  bgColor?: string;
  caretColor?: string;
}) {
  const [items, setItems] = useState([1, 2, 3]);
  return (
    <DndContext
      onDragEnd={(event) => {
        const { active, over } = event;
        console.log(active, over);

        if (active.id !== over?.id) {
          setItems((items) => {
            const oldIndex = items.indexOf(active?.id);
            const newIndex = items.indexOf(over?.id);
            console.log(oldIndex, newIndex);

            return arrayMove(items, oldIndex, newIndex);
          });
        }
      }}
    >
      <div className="w-full">
        <AccordionItem value={title} className="border-none">
          <AccordionTrigger
            className={`h-10  font-[Mulish] font-semibold rounded-xl px-3 ${bgColor} [&>svg]:${caretColor} shadow-none [&[data-state=open]]:rounded-b-none`}
          >
            {title} (9)
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              "bg-[#F1F1F1] rounded-b-xl min-h-40 w-full ",
              isTodoContainer && !items?.length && "min-h-72"
            )}
          >
            {isTodoContainer && (
              <Accordion type="single" collapsible className="hidden md:block">
                <AccordionItem value="item-10" className=" ">
                  <AccordionTrigger className="no-underline px-10 text-[#2F2F2F] font-mulish font-medium border-b border-black/10 [&>svg]:hidden">
                    <p className="flex gap-x-2">
                      <span className="rotate-45">&#10006;</span>
                      Add Task
                    </p>
                  </AccordionTrigger>
                  <AccordionContent className="border-b  border-black/10 px-10 py-2">
                    <div className="flex flex-col gap-y-4">
                      <div
                        id="integral-new-task-row-1"
                        className=" flex gap-x-6 items-center mt-1"
                      >
                        <input
                          type="text"
                          className="h-7 bg-transparent font-mulish font-medium text-xs outline-none focus:border-b w-2/5"
                          placeholder="Task Title"
                        />
                        <Popover>
                          <PopoverTrigger className="w-1/5">
                            <button className="flex gap-x-2 items-center justify-center h-7 bg-transparent font-mulish font-medium text-xs border border-black/20 rounded-full px-2">
                              <Calender /> Add Date
                            </button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="bg-transparent border-none shadow-none pt-0"
                            side="bottom"
                            align="start"
                          >
                            {/* <ShadCalender
                              selected={date}
                              onSelect={setDate}
                              className="rounded-md border bg-white"
                            /> */}
                          </PopoverContent>
                        </Popover>
                        <div className="w-1/5">
                          <Popover>
                            <PopoverTrigger className="w-fit" id="task-status">
                              <button className="flex gap-x-2 items-center justify-center size-8 text-lg   bg-transparent font-mulish font-medium  border border-black/20 rounded-full px-2">
                                +
                              </button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="bg-[#fff9f9] border border-[#7B1984]/15 w-40 p-1 "
                              align="start"
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
                        <div className="w-1/5">
                          <Popover>
                            <PopoverTrigger
                              className="w-fit "
                              id="task-category"
                            >
                              <button className="flex gap-x-2 items-center justify-center size-8 text-lg   bg-transparent font-mulish font-medium  border border-black/20 rounded-full px-2">
                                +
                              </button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="bg-[#fff9f9] border border-[#7B1984]/15   w-40 p-1 "
                              align="start"
                              alignOffset={20}
                            >
                              <div className="flex flex-col gap-y-2 ">
                                <div className="font-mulish font-semibold text-sm h-6 hover:bg-[#ffe6e6] flex items-center w-full rounded-md p-1">
                                  WORK
                                </div>
                                <div className="font-mulish font-semibold text-sm h-6 hover:bg-[#ffe6e6] flex items-center w-full rounded-md p-1">
                                  PERSONAL
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div
                        id="integral-new-task-row-2"
                        className="flex gap-x-2"
                      >
                        <button className="bg-[#7B1984] w-20 h-7  flex items-center gap-x-2 justify-center rounded-full text-">
                          <span className="text-white font-mulish font-bold text-xs">
                            ADD
                          </span>{" "}
                          <Enter fill="#ffffff90" />
                        </button>
                        <button className="bg-transparent w-20 h-7  flex items-center gap-x-2 justify-center rounded-full text-">
                          <span className="text-black font-mulish font-bold text-xs">
                            CANCEL
                          </span>
                        </button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
            {items?.length ? (
              <div className="text-center w-full h-60 font-mulish font-medium text-[#2F2F2F] grid place-items-center ">
              No task in {title}
              </div>
            ) : (
              <SortableContext items={items}>
                {items.map((item) => {
                  return <ListItem item={item} />;
                })}
              </SortableContext>
            )}
          </AccordionContent>
        </AccordionItem>
      </div>
      <DragOverlay>hi there</DragOverlay>
    </DndContext>
  );
}
