import {  MoreHorizontalIcon, Trash2 } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Edit } from "../icons";

const BoardItem = ({ item }: { item: any }) => {
  return (
    <div className="w-full h-28 bg-white rounded-xl border border-[#58575128] flex flex-col justify-between px-3 pt-3 pb-1">
      <div className="w-full  flex justify-between items-center ">
        <span className="font-mulish font-bold text-base">
          Interview with Design Team
        </span>
        <Popover>
          <PopoverTrigger>
            <MoreHorizontalIcon className="size-4" />
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-32 h-20 flex flex-col p-1 items-center justify-center bg-[#fff9f9]"
          >
            <div className="font-mulish text-sm font-medium w-full  rounded-md hover:bg-[#ffe6e6]">
              <div className="flex gap-x-2 h-8  items-center px-2">
                <Edit className="size-4" />
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
      <div className="h-auto flex justify-between items-center">
        <span className="text-[10px] font-mulish font-semibold text-[#7a7a7a]">
          Work
        </span>
        <span className="text-[10px] font-mulish font-semibold text-[#7a7a7a]">
          Date
        </span>
      </div>
    </div>
  );
};

export default BoardItem;
