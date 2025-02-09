import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "../ui/accordion";
import { cn } from "@/lib/utils";
import { Enter, Calender,Grip,Check,More } from "../icons";
import { Calendar as ShadCalender } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export function AccordionListContainer({
  title,
  data,
  isTodoContainer,
  color = "red",
  symbolColor,
}: {
  title: string;
  data?: any[];
  isTodoContainer?: boolean;
  color?: string;
  symbolColor?: string;
}) {
  console.log(color);
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="w-full ">
      <AccordionItem value={title} className="border-none">
        <AccordionTrigger
          style={{
            backgroundColor: color,
            color: symbolColor,
          }}
          className={`h-10  font-[Mulish] font-semibold rounded-xl px-3 [&>svg]:text-[#${symbolColor}] shadow-none [&[data-state=open]]:rounded-b-none`}
        >
          {title} (9)
        </AccordionTrigger>
        <AccordionContent
          className={cn(
            "bg-[#F1F1F1]  rounded-b-xl min-h-40",
            isTodoContainer && !data?.length && "min-h-72"
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
                          <ShadCalender
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border bg-white"
                          />
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
                          <PopoverTrigger className="w-fit " id="task-category">
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
                    <div id="integral-new-task-row-2" className="flex gap-x-2">
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
          {data?.length ? (
            <div className="text-center w-full h-36 font-mulish font-medium text-[#2F2F2F] grid place-items-center ">
              No Tasks in To-Do
            </div>
          ) : (
            <div>
              {[1, 2, 3].map((item) => {
                return (
                  <div className="h-12 w-full  border-b flex gap-x-2 items-center px-2">
                    <div className="flex gap-x-1 items-center w-2/5">
                    <Checkbox className="size-4 border-black/60 shadow-none " />
                    <Grip />
                    <Check />
                    <span className="font-mulish font-medium text-sm w-full truncate bg-red-300">list itemm -  {item} </span>
                    </div>
                    <div className="w-1/5">
                      today
                    </div>
                    <div className="w-1/5">
                      <Popover>
                        <PopoverTrigger>
                          <button className="h-7 bg-[#DDDADD] px-2 rounded-md">
                           TODO
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
                    <div className="w-1/5 flex justify-between">
                    <span className="font-mulish text-sm font-medium">Work</span>
                    <span>
                      <More />
                    </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
