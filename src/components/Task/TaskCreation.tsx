import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { DialogHeader } from "../ui/dialog";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "../ui/drawer";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import useDesktop from "@/hooks/useDesktop";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Auth } from "@/components/authentication/RequestFunctions";
import { db } from "@/firebase";
import { Task } from "../List/ListItem";
import { User } from "firebase/auth";

// import { storage } from "@/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const TaskForm = () => {
  const [isDesktop] = useDesktop();
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    title: undefined,
    description: undefined,
    category: undefined,
    status: "todo",
    dueDate: undefined,
    // files: [],
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      toast({
        title: "New Task added successfully.",
      });
      setFormState({
        title: undefined,
        description: undefined,
        category: undefined,
        status: "todo",
        dueDate: undefined,
      });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: [formState.status] });
    },
  });

  async function addTask(taskData: Task) {
    await updateDoc(doc(db, "users", (Auth.currentUser as User)?.uid), {
      [`todos.${taskData.status}`]: arrayUnion({
        ...taskData,
      }),
    });
    return { success: true };
  }

  function onChangeHandler(e) {
    setFormState((prev) => {
      const { value, id } = e.target;
      return {
        ...prev,
        [id]: value,
      };
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      formState.title === undefined ||
      formState.category === undefined ||
      formState.dueDate === undefined
    ) {
      toast({
        title: "Fill all the required field's.",
      });
    } else {
      mutate(formState);
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className=" h-8 md:h-10 w-24 text-xs md:w-full  bg-[#7B1984] text-white rounded-full font-[Mulish] font-bold">
            Add Task
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl sm:rounded-2xl px-0 pb-0 overflow-hidden">
          <DialogHeader className=" bg-white border-b h-16 px-4">
            <DialogTitle className="font-mulish font-semibold text-2xl">
              Create Task
            </DialogTitle>
          </DialogHeader>
          <form action="" method="post" id="create-task-form">
            <div className="w-full h-fit flex flex-col  gap-y-3 px-4">
              <input
                type="text"
                name="task-title"
                className="h-10 rounded-lg bg-[#fafafa] font-mulish font-normal text-sm text-[#1E212A] border border-black/15 pl-4"
                placeholder="Task Title"
                value={formState.title}
                id="title"
                onChange={onChangeHandler}
                required
              />
              <textarea
                className="h-40 rounded-lg bg-[#fafafa] font-mulish font-normal text-sm text-[#1E212A] border border-black/15 pl-4 resize-none p-2"
                id="description"
                aria-placeholder="Description"
                placeholder={"Description"}
                onChange={onChangeHandler}
                value={formState.description}
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
                      value={"work"}
                      onClick={() => {
                        setFormState((prev) => {
                          return {
                            ...prev,
                            category: "work",
                          };
                        });
                      }}
                      checked={formState.category === "work"}
                      required
                    />
                    <label
                      htmlFor="task-category-work"
                      className="peer-checked/category-one:bg-black/80 peer-checked/category-one:text-white h-8 grid place-items-center w-20 border border-black/20 rounded-full text-[10px] font-mulish font-bold "
                    >
                      Work
                    </label>
                    <input
                      type="radio"
                      name="task-category"
                      id="task-category-personal"
                      className="peer/category-two hidden"
                      value={"personal"}
                      onClick={() => {
                        setFormState((prev) => {
                          return {
                            ...prev,
                            category: "personal",
                          };
                        });
                      }}
                      required
                      checked={formState.category === "personal"}
                    />
                    <label
                      htmlFor="task-category-personal"
                      className="peer-checked/category-two:bg-black/80 peer-checked/category-two:text-white h-8 grid place-items-center w-20 border border-black/20 rounded-full text-[10px] font-mulish font-bold "
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
                    value={formState.dueDate}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
                <div className="flex flex-col w-1/3 gap-y-2">
                  <div className="font-mulish font-semibold text-xs text-[#666666]">
                    {" "}
                    Task Status*
                  </div>
                  <Select
                    required
                    value={formState.status}
                    onValueChange={(value) => {
                      setFormState((prev) => {
                        return {
                          ...prev,
                          status: value,
                        };
                      });
                    }}
                  >
                    <SelectTrigger
                      name="category-select-btn"
                      id="category-select"
                      className=" h-7 md:h-8 rounded-lg w-4/5 text-xs md:text-sm font-[Mulish] font-semibold text-black/60 border border-black/20 bg-[#fafafa] [&>svg]:text-black [&>svg]:size-3  "
                    >
                      <SelectValue
                        placeholder="Choose"
                        className="font-mulish font-semibold text-xs"
                      />
                    </SelectTrigger>
                    <SelectContent className="text-sm font-[Mulish] font-semibold rounded-lg top-4 text-black/60 border border-black/20">
                      <SelectItem value="todo">Todo</SelectItem>
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
                  onChange={(e) => {
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
          <DialogFooter className="bg-[#F1F1F1] w-full h-16 flex flex-end  items-center px-3">
            <button className="h-10 rounded-full bg-white border w-[105px] font-mulish font-bold text-sm cursor-pointer">
              CANCEL
            </button>
            <button
              type="submit"
              form="create-task-form"
              className={cn(
                "h-10 rounded-full bg-[#7B1984] text-white border w-[105px] font-mulish font-bold text-sm cursor-pointer "
              )}
              onClick={submitHandler}
            >
              CREATE
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className=" h-8 md:h-10 w-24 text-xs md:w-full  bg-[#7B1984] text-white rounded-full font-[Mulish] font-bold">
          Add Task
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        {/* <ProfileForm className="px-4" /> */}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            {/* <Button variant="outline">Cancel</Button> */}
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default TaskForm;
