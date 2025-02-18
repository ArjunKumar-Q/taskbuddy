import useDesktop from "@/hooks/useDesktop";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Edit } from "@/components/icons";
import { Drawer } from "../ui/drawer";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { Task } from "../List/ListItem";
import { SelectItem } from "../ui/select";

const TaskEditor = ({ task }: { task: Task }) => {
  console.log(task);
  const [isDesktop] = useDesktop();
  const [open, setOpen] = useState(false);
  const [taskState, setTaskState] = useState<Task>({});

  useEffect(() => {
    setTaskState({ ...task });
  }, [task]);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full">
          <div className="flex gap-x-2 h-8  items-center px-2">
            <Edit />
            <span className="font-mulish font-semibold text-black">Edit</span>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl xl:max-w-5xl sm:rounded-2xl px-0 pb-0 overflow-hidden gap-0">
          <DialogHeader className=" bg-white border-b h-12 px-4 "></DialogHeader>

          <div className="flex flex-col lg:flex-row ">
            <div className="p-2 w-4/6 overflow-y-auto border-r border-[#dedede]">
              <form action="" method="post" id="create-task-form">
                <div className="w-full h-fit flex flex-col  gap-y-3 px-4">
                  <input
                    type="text"
                    name="task-title"
                    className="h-10 rounded-lg bg-[#fafafa] font-mulish font-normal text-sm text-[#1E212A] border border-black/15 pl-4"
                    placeholder="Task Title"
                    value={taskState.title}
                    id="title"
                    // onChange={onChangeHandler}
                    required
                  />
                  <textarea
                    className="h-40 rounded-lg bg-[#fafafa] font-mulish font-normal text-sm text-[#1E212A] border border-black/15 pl-4 resize-none p-2"
                    id="description"
                    aria-placeholder="Description"
                    placeholder={"Description"}
                    // onChange={onChangeHandler}
                    value={taskState.description}
                  ></textarea>

                  <div className="flex ">
                    <div className="flex flex-col w-1/3 gap-y-2">
                      <div className="font-mulish font-semibold text-xs text-[#666666]">
                        {" "}
                        Task Category*
                      </div>
                      <div className="flex gap-x-2">
                        <input
                          type="radio"
                          name="task-category"
                          id="task-category-work"
                          className="peer/category-one hidden"
                          value={"Work"}
                          //   onClick={() => {
                          //     setFormState((prev) => {
                          //       return {
                          //         ...prev,
                          //         category: "work",
                          //       };
                          //     });
                          //   }}
                          checked={taskState.category === "Work"}
                          required
                        />
                        <label
                          htmlFor="task-category-work"
                          className="peer-checked/category-one:bg-[#7b1984] peer-checked/category-one:text-white h-8 grid place-items-center w-20 border border-black/20 rounded-full text-[10px] font-mulish font-bold "
                        >
                          Work
                        </label>
                        <input
                          type="radio"
                          name="task-category"
                          id="task-category-personal"
                          className="peer/category-two hidden"
                          value={"personal"}
                          //   onClick={() => {
                          //     setFormState((prev) => {
                          //       return {
                          //         ...prev,
                          //         category: "personal",
                          //       };
                          //     });
                          //   }}
                          //   required
                          checked={taskState.category === "Personal"}
                        />
                        <label
                          htmlFor="task-category-personal"
                          className="peer-checked/category-two:bg-[#7b1984] peer-checked/category-two:text-white h-8 grid place-items-center w-20 border border-black/20 rounded-full text-[10px] font-mulish font-bold "
                        >
                          Personal
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col w-1/3 gap-y-2">
                      <div className="font-mulish font-semibold text-xs text-[#666666]">
                        {" "}
                        Due Date*
                      </div>
                      <input
                        type="date"
                        name="date"
                        id="dueDate"
                        className=" h-7 md:h-8 rounded-lg w-4/5 text-xs md:text-sm font-[Mulish] font-semibold text-black/60 border border-black/20 bg-[#fafafa] [&>svg]:text-black [&>svg]:size-3 px-2 "
                        value={taskState.dueDate}
                        // onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <div className="flex flex-col w-1/3 gap-y-2">
                      <div className="font-mulish font-semibold text-xs text-[#666666] relative">
                        {" "}
                        Task Status*
                      </div>
                      <Select
                        required
                        value={taskState.status}
                        onValueChange={(value) => {
                          // setFormState((prev) => {
                          //   return {
                          //     ...prev,
                          //     status: value,
                          //   };
                          // });
                        }}
                      >
                        <SelectTrigger
                          name="category-select-btn"
                          id="category-select"
                          className=" h-7 md:h-8 rounded-lg w-4/5 text-xs md:text-sm font-[Mulish] font-semibold text-black/60 border border-black/20 bg-[#fafafa] [&>svg]:text-black [&>svg]:size-3  "
                        >
                          <SelectValue
                            placeholder="Choose"
                            className="font-mulish font-semibold text-xs "
                          />
                        </SelectTrigger>
                        <SelectContent  className=" text-sm font-[Mulish] font-semibold rounded-lg top-4 text-black/60 border border-black/20">
                          <SelectItem value="todo" className="">Todo</SelectItem>
                          <SelectItem value="in-progress">In-progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* <div className="flex flex-col gap-y-2 ">
                <span className="font-mulish font-semibold text-sm text-[#666666]">
                  Attachment
                </span>
                <label
                  htmlFor="task-file"
                  className="w-full h-11 bg-[#fafafa] border border-black/20 rounded-lg flex items-center gap-x-1 justify-center px-4 cursor-pointer"
                >
                  <span className="text-sm text-[#1E212A] font-mulish font-medium ">
                    Drop your files here or{" "}
                  </span>
                  <span className="text-sm text-[#2956DD] font-mulish font-medium  underline underline-offset-1">
                    Choose File
                  </span>
                </label>
                <input
                  type="file"
                  name="task-file"
                  id="task-file"
                  className="hidden"
                  multiple
                //   onChange={(e) => {
                    const fileName =
                      e.target.files?.[0]?.name || "No file chosen";
                    const label = e.target.previousElementSibling;
                    if (label) {
                      label.querySelector("span")!.textContent = fileName;
                    }
                  }}
                />
                
                <div className="h-48"></div>
              </div> */}
                </div>
              </form>
            </div>
            <div className="w-2/6 bg-[#f1f1f1]">
              <p className="h-12 bg-white font-mulish font-semibold text-base border-b border-[#dedede]">
                Activity
              </p>
              <div className="flex flex-col gap-y-1">
                {[1, 2, 4].map((item) => {
                  return (
                    <div className="text-[#484b52] font-mulish font-normal text-xs flex justify-between h-7 py-1 px-2">
                      <p>This is item no:{item}</p>
                      <span>time</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <DialogFooter className="bg-[#F1F1F1] w-full h-16 flex flex-end  items-center px-3 border-t border-[#d2d2d2]">
            <button className="h-10 rounded-full bg-white border w-[105px] font-mulish font-bold text-sm cursor-pointer">
              CANCEL
            </button>
            <button
              type="submit"
              form="create-task-form"
              className={cn(
                "h-10 rounded-full bg-[#7B1984] text-white border w-[105px] font-mulish font-bold text-sm cursor-pointer "
              )}
              // onClick={submitHandler}
            >
              UPDATE
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return <Drawer open={open} onOpenChange={setOpen}></Drawer>;
};

export default TaskEditor;
