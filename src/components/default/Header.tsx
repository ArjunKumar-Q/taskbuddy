import { Logo, List, Block, Logout, Search } from "../icons";
import { auth } from "../../firebase";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Header() {
  console.log(auth.currentUser.photoURL)
  return (
    <header className=" flex flex-col justify-center  w-full gap-y-4  ">
      <div
        className="flex justify-between items-center bg-[#FAEEFC] lg:bg-transparent px-4 py-2 lg:p-0 "
        id="row-1"
      >
        <div className="flex gap-x-1 ">
          <Logo className="h-7 w-7 hidden lg:block" />
          <p className="text-[#2F2F2F] text-xl font-[Mulish] font-semibold">
            TaskBuddy
          </p>
        </div>
        <div >
          <Popover>
            <PopoverTrigger className="flex gap-x-2 items-center">
          <img
            src={auth.currentUser.photoURL}
            alt={auth.currentUser.displayName}
            className="h-9 w-9 rounded-full "
          />
          <span className="hidden lg:block font-[Mulish] text-black/60 text-base font-bold">
            {auth.currentUser.displayName}
          </span>
            </PopoverTrigger>
            <PopoverContent className="flex justify-end p-0 bg-transparent border-none outline-none shadow-none w-fit">
            <button
              // onClick={onSignOutHandler}
              className="h-10 w-30  text-black flex items-center justify-center gap-x-2 border border-[#7B1984] bg-[#7B1984]/10 rounded-xl p-4 "
            >
              <Logout className="h-4 w-4" />
              <span className="font-[Mulish] font-semibold text-black text-sm">
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
            <div className="flex gap-x-1 items-center hover:border-b-2 border-black">
              <List className="h-5 w-5 " fill="#000000" />
              <span className="font-[Mulish] text-black text-base font-bold">
                List
              </span>
            </div>
            <div className="flex gap-x-1 items-center hover:border-b-2 border-black">
              <Block className="h-5 w-5 " fill="#000000" />
              <span className="font-[Mulish] text-black text-base font-bold">
                Block
              </span>
            </div>
          </div>
          {/* <div>
          <div>
            <button
              // onClick={onSignOutHandler}
              className="h-10 w-30  text-black flex items-center justify-center gap-x-2 border border-[#7B1984] bg-[#7B1984]/10 rounded-xl p-4 "
            >
              <Logout className="h-4 w-4" />
              <span className="font-[Mulish] font-semibold text-black text-sm">
                Logout
              </span>
            </button>
          </div>
        </div> */}
        </div>

        <div
          id="row-3"
          className="flex flex-col-reverse py-2 md:mt-3 md:flex-row md:py-0 lg:mt-0 "
        >
          <div className=" flex flex-col gap-y-4 px-4 md:flex-row md:gap-x-4 md:gap-y-0 md:w-4/5  md:justify-between md:items-center  md:pr-2 lg:w-5/6  lg:px-0 lg:pr-2 xl:w-11/12">
            <div className="flex gap-x-2 gap-y-2 flex-col md:flex-row md:gap-x-4 md:items-center ">
              <span className="font-[Mulish] font-semibold text-sm text-black/60">
                Filter by:
              </span>
              <div className="flex gap-x-2 ">
                <Select>
                  <SelectTrigger
                    name="category-select-btn"
                    id="category-select"
                    className=" h-7 md:h-8 rounded-full w-30 text-xs md:text-sm font-[Mulish] font-semibold text-black/60 border border-black/20"
                  >
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="text-sm font-[Mulish] font-semibold rounded-lg top-4 text-black/60 border border-black/20">
                    <SelectGroup title="Category">
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger
                    name="due-date-select-btn"
                    id="due-date-select"
                    className="h-7 md:h-8 rounded-full w-30 text-xs md:text-sm  font-[Mulish] font-semibold text-black/60 border border-black/20"
                  >
                    <SelectValue placeholder="Due Date" />
                  </SelectTrigger>
                  <SelectContent className="text-sm font-[Mulish] font-semibold rounded-lg top-4 text-black/60 border border-black/20">
                    <SelectGroup title="Due Date">
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="relative">
              <input
                type="search"
                name="search-bar"
                id="search-bar"
                className="w-full md:w-51 border h-8 md:h-10 rounded-full pl-8 pr-4 outline-none text-sm font-[Mulish] font-semibold text-black/60 border-black/20 "
                placeholder="search"
              />
              <Search
                className="absolute top-1/2 left-3  -translate-y-1/2"
                fill="#fff768"
              />
            </div>
          </div>
          <div className="flex justify-end md:w-1/5 lg:w-1/6 xl:w-1/12 items-center pr-4 md:pr-0">
            <button className=" h-8 md:h-10 w-24 text-xs md:w-full  bg-[#7B1984] text-white rounded-full font-[Mulish] font-bold">
              Add Task
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
