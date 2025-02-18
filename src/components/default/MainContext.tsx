import { ListContainer } from "@/components/List/ListContainer";
import { Accordion } from "../ui/accordion";
import useTask from "@/hooks/useTask";
import { BoardContainer } from "../Board/BoardContainer";
import { Sort } from "../icons";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { app, db } from "@/firebase";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { getAuth, User } from "firebase/auth";
import { Task } from "../List/ListItem";

export function MainContext() {
  const [state, dispatch] = useTask();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: deleteFn } = useMutation({
    mutationFn: deleteHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      queryClient.invalidateQueries({ queryKey: ["in-progress"] });
      queryClient.invalidateQueries({ queryKey: ["completed"] });
      toast({
        title: "Tasks Deleted Successfully",
      });
    },
  });

  const { mutate: changeStatus } = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {},
  });

  async function deleteHandler() {
    const tasks: { [key: string]: Task[] } = {
      todo: [],
      "in-progress": [],
      completed: [],
    };
    state.selectedTasks.map((task: Task) => {
      if (task.status === "todo") {
        tasks.todo.push(task);
      } else if (task.status === "in-progress") {
        tasks["in-progress"].push(task);
      } else {
        tasks.completed.push(task);
      }
    });
    await updateDoc(doc(db, "users", (getAuth(app).currentUser as User).uid), {
      "todos.todo": arrayRemove(...tasks.todo),
      "todos.in-progress": arrayRemove(...tasks["in-progress"]),
      "todos.completed": arrayRemove(...tasks.completed),
    });
  }
  async function updateStatus() {
    // await update
  }

  function closeHandler() {
    if (
      state.category !== undefined ||
      state.searchQuery !== undefined ||
      state.dueDate !== undefined
    ) {
      return ["Todo", "In-Progress", "Completed"];
    }
  }

  if (state.viewType === "list") {
    return (
      <>
        <div className="my-8"></div>
        <div className=" w-full  px-4 py-2 lg:p-0 ">
          <Accordion
            type="multiple"
            className="flex flex-col gap-y-2"
            defaultValue={["Todo"]}
            value={closeHandler()}
          >
            <div className="w-full h-10  flex items-center border-t ">
              <div className="w-3/4 md:w-2/5 font-mulish font-bold text-sm text-[#666666] truncate">
                Task name
              </div>
              <div
                className="flex w-1/4 md:w-1/5  gap-x-2 items-center cursor-pointer truncate"
                onClick={() =>
                  dispatch({
                    type: "SORT_DATE",
                  })
                }
              >
                <span className="font-mulish font-bold text-sm text-[#666666] truncate">
                  Due on
                </span>{" "}
                <Sort className="size-2" />
              </div>
              <div className="hidden md:block w-1/5 font-mulish font-bold text-sm text-[#666666]">
                Task Status
              </div>
              <div className="hidden md:block w-1/5 font-mulish font-bold text-sm text-[#666666]">
                Task Category
              </div>
            </div>
            <ListContainer
              meta={{
                title: "Todo",
                bgColor: "bg-[#FAC3FF]",
                caretColor: "text-[#3E0344]",
                isTodoContainer: true,
                queryToken: "todo",
              }}
            />
            <ListContainer
              meta={{
                title: "In-Progress",
                bgColor: "bg-[#85D9F1]",
                caretColor: "text-[#3E0344]",
                queryToken: "in-progress",
              }}
            />
            <ListContainer
              meta={{
                title: "Completed",
                bgColor: "bg-[#CEFFCC]",
                caretColor: "text-[#0D7A0A]",
                queryToken: "completed",
              }}
            />
          </Accordion>
          {state.selectedTasks.length > 0 && (
            <div className="absolute h-fit  w-fit   bg-[#1A1C20] bottom-2 left-1/2 -translate-x-1/2 rounded-xl flex flex-col sm:flex-row items-center justify-between p-2 gap-2">
              <div className="flex w-56 h-10 rounded-full items-center gap-x-4 font-mulish font-semibold text-white border border-white px-4">
                <span className="w-4/5">
                  {state.selectedTasks.length} Tasks Selected
                </span>{" "}
                <X className="size-4" />
              </div>
              <div className="flex gap-x-3">
                <Button
                  className="bg-[#2a2b2f] border border-[#8D8A8A24] text-white font-mulish font-semibold text-xs rounded-full"
                  variant={"outline"}
                >
                  Status
                </Button>
                <Button
                  className="bg-[#3a1f23] text-[#E13838] border border-[#FF353524] font-mulish font-semibold text-xs rounded-full hover:bg-[#48282d] hover:text-[#E13838]"
                  variant={"outline"}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="my-10"></div>
      <div
        className=" flex gap-x-4 mt-4"
        style={{
          height: window.innerHeight / 1.4,
        }}
      >
        <BoardContainer
          meta={{
            title: "Todo",
            bgColor: "bg-[#FAC3FF]",
            caretColor: "text-[#3E0344]",
            isTodoContainer: true,
            queryToken: "todo",
          }}
        />
        <BoardContainer
          meta={{
            title: "In-Progress",
            bgColor: "bg-[#85D9F1]",
            caretColor: "text-[#3E0344]",
            queryToken: "in-progress",
          }}
        />
        <BoardContainer
          meta={{
            title: "Completed",
            bgColor: "bg-[#CEFFCC]",
            caretColor: "text-[#0D7A0A]",
            queryToken: "completed",
          }}
        />
      </div>
    </>
  );
}
