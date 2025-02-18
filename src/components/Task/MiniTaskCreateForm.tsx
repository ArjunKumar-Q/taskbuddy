import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Calender, Enter } from "../icons";
import { useState } from "react";
import { Calendar as ShadCalender } from "../ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, app } from "@/firebase";
import { getAuth } from "firebase/auth";
import { cn } from "@/lib/utils";
import type { Task } from "../List/ListItem";

const Auth = getAuth(app);

async function addTask(taskData: Task) {
  await updateDoc(doc(db, "users", Auth.currentUser?.uid), {
    [`todos.${taskData.status}`]: arrayUnion({
      ...taskData,
    }),
  });
  return { success: true };
}

const initialState = {
  title: "",
  dueDate: undefined,
  status: "",
  category: "",
};

function MiniTaskForm({ borderless }: { borderless?: boolean }) {
  const [state, setState] = useState<Task>({
    ...initialState,
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      setState({
        ...initialState,
      });
      queryClient.invalidateQueries({ queryKey: [state.status] });
    },
    onError: (error) => {
      console.error("Error adding user:", error.message);
    },
  });

  const onChangeHandler = (e) => {
    setState((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  const selectChangeHandler = (id: string, value: string | Date) => {
    console.log(value);
    setState((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      state.title === "" ||
      state.status === "" ||
      state.category === "" ||
      state.dueDate === undefined
    ) {
      toast({
        title: "Details Missing",
        description: "Need to fill all the details.",
      });
    } else {
      mutation.mutate(state);
      toast({
        title: "New Todo successfully added",
      });
    }
  };

  return (
    <Accordion type="single" collapsible className="hidden md:block">
      <AccordionItem
        value="mini-task-form"
        className={cn("", borderless && "border-b-0")}
      >
        <AccordionTrigger
          className={cn(
            " h-12 w-full no-underline px-10 text-[#2F2F2F] font-mulish font-medium border-b border-black/10 [&>svg]:hidden ",
            borderless && "border-none"
          )}
        >
          <p className="flex gap-x-2">
            <span className="rotate-45">&#10006;</span>
            Add Task
          </p>
        </AccordionTrigger>
        <AccordionContent
          className={cn(
            " border-black/10 px-10 py-2 border-b",
            borderless && "border-none"
          )}
        >
          <form
            method="POST"
            id="mini-task-creation-form"
            className="flex flex-col gap-y-4"
            onSubmit={onSubmitHandler}
          >
            <div
              id="mini-task-creation-row-1"
              className=" flex gap-x-6 items-center mt-1"
            >
              <input
                type="text"
                id="title"
                className="h-7 bg-transparent font-mulish font-medium text-xs outline-none focus:border-b w-2/5"
                placeholder="Task Title"
                value={state.title}
                onChange={onChangeHandler}
              />
              <Popover>
                <PopoverTrigger className="w-1/5 ">
                  <div>
                    <button
                      type="button"
                      className="flex gap-x-2 w-28  items-center  h-7 bg-transparent font-mulish font-medium text-xs border border-black/20 rounded-full px-2 text-[#606060]"
                    >
                      <Calender className="w-1/5" />{" "}
                      <span className="w-4/5">
                        {state.dueDate
                          ? new Date().toLocaleDateString() == state.dueDate
                            ? "Today"
                            : state.dueDate
                          : "Add Date"}
                      </span>
                    </button>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className="bg-transparent border-none shadow-none pt-0 w-fit"
                  side="bottom"
                  align="start"
                >
                  <ShadCalender
                    selected={
                      state.dueDate ? new Date(state.dueDate) : undefined
                    }
                    className="bg-white rounded-md mt-3"
                    onDayClick={(day) => {
                      // console.log(day.toLocaleDateString());
                      selectChangeHandler("dueDate", day.toLocaleDateString());
                    }}
                  />
                </PopoverContent>
              </Popover>
              <div className="w-1/5">
                <Select
                  onValueChange={(value) =>
                    selectChangeHandler("status", value)
                  }
                >
                  <SelectTrigger
                    className="outline-none border-none shadow-none w-fit p-0 rounded-full ring-0  [&>svg]:hidden "
                    value={state.status}
                  >
                    <div>
                      {state.status !== "" ? (
                        <button
                          type="button"
                          className=" h-7 md:h-8 rounded-full w-28 text-xs md:text-sm font-[Mulish] font-semibold text-black/60 border border-black/20"
                        >
                          {state.status.toUpperCase()}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="flex gap-x-2 items-center justify-center size-8 text-lg   bg-transparent font-mulish font-medium  border border-black/20 rounded-full px-2"
                        >
                          +
                        </button>
                      )}
                    </div>
                  </SelectTrigger>
                  <SelectContent
                    className=" bg-[#fff9f9] border border-[#7B1984]/15 w-40 p-1  "
                    align="start"
                    side={state.status !== "" ? "bottom" : "right"}
                    alignOffset={20}
                  >
                    {["todo", "in-progress", "completed"].map((item) => {
                      return (
                        <SelectItem
                          key={item}
                          value={item}
                          className="font-mulish font-semibold text-sm h-8 shadow-none  flex items-center w-full rounded-md p-1 focus:bg-[#ffe6e6] [&>.symbol]:hidden"
                        >
                          {item.toUpperCase()}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/5">
                <Select
                  onValueChange={(value) =>
                    selectChangeHandler("category", value)
                  }
                >
                  <SelectTrigger
                    className="outline-none border-none shadow-none w-fit p-0 rounded-full ring-0  [&>svg]:hidden "
                    value={state.category}
                  >
                    <div>
                      {state.category !== "" ? (
                        <button
                          type="button"
                          className=" h-7 md:h-8 rounded-full w-28 text-xs md:text-sm font-[Mulish] font-semibold text-black/60 border border-black/20"
                        >
                          {state.category}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="flex gap-x-2 items-center justify-center size-8 text-lg   bg-transparent font-mulish font-medium  border border-black/20 rounded-full px-2"
                        >
                          +
                        </button>
                      )}
                    </div>
                  </SelectTrigger>
                  <SelectContent
                    className=" bg-[#fff9f9] border border-[#7B1984]/15 w-40 p-1  "
                    align="start"
                    side={state.category ? "bottom" : "right"}
                    alignOffset={20}
                  >
                    {["Work", "Personal"].map((item) => {
                      return (
                        <SelectItem
                          key={item}
                          value={item}
                          className="font-mulish font-semibold text-sm h-8 shadow-none  flex items-center w-full rounded-md p-1 focus:bg-[#ffe6e6] [&>.symbol]:hidden"
                        >
                          {item}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div id="integral-new-task-row-2" className="flex gap-x-2">
              <button
                type="submit"
                form="mini-task-creation-form"
                className="bg-[#7B1984] w-20 h-7  flex items-center gap-x-2 justify-center rounded-full text-sm"
                disabled={mutation.isPending}
              >
                <span className="text-white font-mulish font-bold text-xs">
                  ADD
                </span>{" "}
                <Enter fill="#ffffff90" />
              </button>
              <button
                type="button"
                className="bg-transparent w-20 h-7  flex items-center gap-x-2 justify-center rounded-full "
              >
                <span className="text-black font-mulish font-bold text-xs">
                  CANCEL
                </span>
              </button>
            </div>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default MiniTaskForm;
