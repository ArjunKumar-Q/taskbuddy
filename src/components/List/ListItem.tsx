import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Grip, Check, Edit } from "@/components/icons";
import { Trash2 } from "lucide-react";
import { More } from "../icons";
import useTask from "@/hooks/useTask";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { db, app } from "@/firebase";
import { useToast } from "@/hooks/use-toast";

import { useState, type CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuth, User } from "firebase/auth";
import { Button } from "../ui/button";
import useDesktop from "@/hooks/useDesktop";
import TaskEditor from "../Task/EditTask";

export type Task = {
  title: string | undefined;
  description?: string | undefined;
  category: string | undefined;
  status: string | undefined;
  dueDate: string | undefined;
  files?: string[];
};

const Auth = getAuth(app);

function ListItem({
  task,
  borderless,
  isOverlay,
}: {
  task: Task;
  borderless?: boolean;
  isOverlay?: boolean;
}) {
  const id = task.title;
  const isDesktop = useDesktop();
  const [state, dispatch] = useTask();
  const queryClient = useQueryClient();
  const { searchQuery, dueDate, category } = state;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: id });
  const { toast } = useToast();

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const statusMutation = useMutation({
    mutationFn: taskStatusChange,
    onSuccess: ({ data }) => {
      console.log(data, task.status);
      queryClient.invalidateQueries({ queryKey: [task.status] });
      queryClient.invalidateQueries({ queryKey: [data.status] });
    },
  });
  const deleteTask = useMutation({
    mutationFn: deleteTaskFn,
    onSuccess: () => {
      toast({
        title: "Task deleted Successfully",
      });
      queryClient.invalidateQueries({ queryKey: [task.status] });
    },
  });

  async function taskStatusChange(value: string) {
    await updateDoc(doc(db, "users", (Auth.currentUser as User).uid), {
      [`todos.${task.status}`]: arrayRemove(task),
      [`todos.${value}`]: arrayUnion({ ...task, status: value }),
    });
    return { success: true, data: { status: value } };
  }

  async function deleteTaskFn() {
    await updateDoc(doc(db, "users", (Auth.currentUser as User).uid), {
      [`todos.${task.status}`]: arrayRemove(task),
    });
    return { success: true };
  }

  function checkboxHandler(e) {
    if (e.target.dataset.state == "checked") {
      dispatch({
        type: "REMOVE_TASK",
        payload: {
          taskTitle: task.title,
        },
      });
    } else {
      dispatch({
        type: "SELECT_TASK",
        payload: {
          task,
        },
      });
    }
  }

  console.log(
    state.selectedTasks.filter(({ title }) => title === title).length
  );
  return (
    <div
      className={cn(
        "h-12 w-full  border-b flex gap-x-2 items-center px-2",
        searchQuery !== undefined &&
          !task.title.includes(searchQuery) &&
          "hidden",
        category !== undefined && category !== task.category && "hidden",
        dueDate !== undefined && dueDate !== task.dueDate && "hidden",
        borderless && "border-none",
        isOverlay && "bg-white h-11 rounded-lg shadow-lg"
      )}
      ref={setNodeRef}
      style={style}
    >
      <div className="flex gap-x-2 md:gap-x-1 items-center w-3/4 md:w-2/5">
        <Checkbox
          id={"task-checkbox-" + task.title}
          className="size-4 border-black/60 shadow-none "
          onClick={checkboxHandler}
          checked={
            state.selectedTasks.filter(({ title }) => title == title).length >
              0 && true
          }
        />
        <button {...attributes} {...listeners} ref={setActivatorNodeRef}>
          <Grip className="hidden md:block" />
        </button>
        <Check
          className={cn(
            "text-[#a7a7a7]",
            task.status == "completed" && "text-[#1B8D17]"
          )}
        />
        <span
          className={cn(
            "font-mulish font-medium text-sm w-full truncate ",
            task.status.toLowerCase() === "completed" && "line-through"
          )}
          title={task.title}
        >
          {task.title}
        </span>
      </div>
      <div className="w-1/4 md:w-1/5 truncate">
        {new Date().toLocaleDateString() == task.dueDate
          ? "Today"
          : new Date(task.dueDate)
              .toString()
              .split(" ")
              .slice(1, 4)
              .join(" ")
              .replace(
                ` ${new Date().getFullYear()}`,
                `, ${new Date().getFullYear()}`
              )}
      </div>
      <div className="hidden md:block w-1/5">
        <Select
          value={task.status}
          onValueChange={(value) => {
            statusMutation.mutate(value);
          }}
        >
          <SelectTrigger
            name="category-select-btn"
            id="category-select"
            className="h-8 bg-[#DDDADD] px-2 rounded-md w-fit text-xs md:text-sm font-[Mulish] font-semibold text-black/60 [&>svg]:hidden"
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent
            className="text-sm font-[Mulish] bg-[#fff9f9] font-semibold rounded-lg top-4 text-black/60 border border-[#7B1984]/15 "
            sideOffset={-15}
          >
            <SelectItem
              className="[&>#check]:hidden focus:bg-[#ffe6e6]"
              value="todo"
            >
              TODO
            </SelectItem>
            <SelectItem
              className="[&>#check]:hidden focus:bg-[#ffe6e6]"
              value="in-progress"
            >
              IN-PROGRESS
            </SelectItem>
            <SelectItem
              className="[&>#check]:hidden focus:bg-[#ffe6e6]"
              value="completed"
            >
              COMPLETED
            </SelectItem>
          </SelectContent>
        </Select>
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
              <TaskEditor task={{ ...task }} />
            </div>
            <div className="font-mulish text-sm font-medium w-full  rounded-md hover:bg-[#ffe6e6]">
              <Dialog>
                <DialogTrigger>
                  <div className="flex gap-x-2 h-8  items-center px-2">
                    <Trash2 className="size-4 text-[#DA2F2F]" />
                    <span className="font-mulish font-semibold text-[#DA2F2F]">
                      Delete
                    </span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Delete task{" "}
                      <span className="bg-[#DDDADD]/40 p-1 rounded-md w-fit text-base  font-[Mulish] font-semibold text-black/60 [&>svg]:hidden">
                        {task.title}
                      </span>
                    </DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    Are you sure about deleting the task ?
                  </DialogDescription>
                  <DialogFooter>
                    <Button
                      variant={"destructive"}
                      onClick={() => deleteTask.mutate()}
                      disabled={deleteTask.isPending}
                    >
                      Delete
                    </Button>
                    <DialogClose>
                      <Button>Cancel</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default ListItem;
