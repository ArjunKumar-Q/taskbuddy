import { Logo, List, Board, Logout, Search } from "../icons";
import { auth } from "../../firebase";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import useTask from "@/hooks/useTask";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TaskForm from "../Task/TaskCreation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";

import { signOut } from "firebase/auth";
import { FilterX } from "lucide-react";

export function Header() {
  const [state, dispatch] = useTask();
  const { toast } = useToast();

  const resetHandler = () => {
    dispatch({
      type: "RESET",
    });
  };

  const viewHandler = (e) => {
    dispatch({
      type: "VIEW_CHANGE",
      payload: {
        value: e.currentTarget.id,
      },
    });
  };

  const signOutHandler = () => {
    signOut(auth).then(() => {
      toast({
        title: "Logged out successfully",
      });
    });
  };

  return (
    <header className=" flex flex-col justify-center  w-full gap-y-4  ">
      <div
        className="flex justify-between items-center bg-[#FAEEFC] lg:bg-transparent px-4 py-2 lg:p-0 "
        id="row-1"
      >
        <div className="flex gap-x-1 ">
          <Logo className="h-6 w-6 hidden lg:block" />
          <p className="text-[#2F2F2F] text-xl font-[Mulish] font-semibold">
            TaskBuddy
          </p>
        </div>
        <div>
          <Popover>
            <PopoverTrigger className="flex gap-x-2 items-center">
              <img
                src={auth.currentUser.photoURL}
                alt={auth.currentUser.displayName}
                className="h-9 w-9 rounded-full "
              />
              <span className="hidden lg:Board font-[Mulish] text-black/60 text-base font-bold">
                {auth.currentUser.displayName}
              </span>
            </PopoverTrigger>
            <PopoverContent className="flex justify-end p-0 rounded-xl border-none outline-none shadow-none w-fit mr-4 lg:mr-8 mt-2 ">
              <button
                onClick={signOutHandler}
                className=" h-10 w-30  text-black flex items-center justify-center gap-x-2 border border-[#7B1984] bg-[#7B1984]/10 rounded-xl p-4 "
              >
                <Logout className="h-4 w-4" />
                <span className="font-[Mulish] font-semibold text-black text-sm ">
                  Logout
                </span>
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="w-full h-full ">
        <div className="hidden lg:flex  h-10">
          <div className="flex gap-x-3 pb-1">
            <button
              className={cn(
                "flex gap-x-1 items-end mb-[1px] ",
                state.viewType == "list" && "border-b border-black mb-0"
              )}
              id="list"
              onClick={viewHandler}
            >
              <List
                className="h-5 w-5 mb-1 "
                fill={state.viewType === "list" ? "#000000" : "#231F2082"}
              />
              <span
                className={cn(
                  "font-[Mulish] text-[#231F2082] text-base font-bold pb-0.5",
                  state.viewType === "list" && "text-black"
                )}
              >
                List
              </span>
            </button>
            <button
              className={cn(
                "flex gap-x-1 items-end mb-[1px]",
                state.viewType === "board" && "border-b border-black mb-0"
              )}
              id="board"
              onClick={viewHandler}
            >
              <Board
                className="h-5 w-5 mb-1"
                fill={state.viewType === "board" ? "#000000" : "#231F2082"}
              />
              <span
                className={cn(
                  "font-[Mulish] text-[#231F2082] text-base font-bold pb-0.5",
                  state.viewType === "board" && "text-black"
                )}
              >
                Board
              </span>
            </button>
          </div>
        </div>

        <div
          id="row-3"
          className="flex flex-col-reverse py-2 md:mt-3 md:flex-row md:py-0 lg:mt-2 "
        >
          <div className=" flex flex-col gap-y-4 px-4 md:flex-row md:gap-x-4 md:gap-y-0 md:w-4/5  md:justify-between md:items-center  md:pr-2 lg:w-5/6  lg:px-0 lg:pr-2 xl:w-11/12">
            <div className="flex gap-x-2 gap-y-2 flex-col md:flex-row md:gap-x-4 md:items-center ">
              <span className="font-[Mulish] font-semibold text-sm text-black/60">
                Filter by:
              </span>
              <div className="flex gap-x-3 items-center">
                <Select
                  value={state.category}
                  onValueChange={(value) => {
                    console.log(value);
                    dispatch({
                      type: "CATEGORY",
                      payload: {
                        value: value == undefined ? "" : value,
                      },
                    });
                  }}
                >
                  <SelectTrigger
                    name="category-select-btn"
                    id="category-select"
                    className=" h-7 md:h-8 rounded-full w-30 text-xs md:text-sm font-[Mulish] font-semibold text-black/60 border border-black/20"
                  >
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent
                    className="text-sm font-[Mulish] font-semibold rounded-lg top-4 text-black/60 border border-black/20"
                    sideOffset={-15}
                  >
                    <SelectGroup title="Category">
                      <SelectItem value="Work">Work</SelectItem>
                      <SelectItem value="Personal">Personal</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select value={state.dueDate}>
                  <SelectTrigger
                    name="due-date-select-btn"
                    id="due-date-select"
                    className="h-7 md:h-8 rounded-full w-30 text-xs md:text-sm  font-[Mulish] font-semibold text-black/60 border border-black/20"
                  >
                    <SelectValue placeholder="Due Date" />
                  </SelectTrigger>
                  <SelectContent
                    className="text-sm font-[Mulish] font-semibold rounded-lg top-4 text-black/60 border border-black/20 "
                    sideOffset={-15}
                  >
                    <SelectGroup title="Due Date">
                      <SelectItem value="apple">Today</SelectItem>
                      <SelectItem value="banana">Tomorrow</SelectItem>
                      <SelectItem value="banana">Yesterday</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {(state.category || state.dueDate) && (
                  <Button
                    className="rounded-full group size-8"
                    variant={"outline"}
                    size={"icon"}
                    onClick={resetHandler}
                  >
                    <FilterX className="stroke-[#231F2082] size-4 group-hover:stroke-black" />
                  </Button>
                )}
              </div>
            </div>
            <div className="relative">
              <input
                type="search"
                name="search-bar"
                id="search-bar"
                className="w-full md:w-51 border h-8 md:h-10 rounded-full pl-8 pr-4 outline-none text-sm font-[Mulish] font-semibold text-black/60 border-black/20 "
                placeholder="search"
                onChange={(e) => {
                  dispatch({
                    type: "SEARCH",
                    payload: {
                      value: e.target.value === "" ? undefined : e.target.value,
                    },
                  });
                }}
              />
              <Search
                className="absolute top-1/2 left-3  -translate-y-1/2"
                fill="#fff768"
              />
            </div>
          </div>
          <div className="flex justify-end md:w-1/5 lg:w-1/6 xl:w-1/12 items-center mr-4 lg:mr-0">
            <TaskForm />
          </div>
        </div>
      </div>
    </header>
  );
}
