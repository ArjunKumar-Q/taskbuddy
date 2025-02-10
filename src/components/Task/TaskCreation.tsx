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

const Task = () => {
  const [isDesktop] = useDesktop();
  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className=" h-8 md:h-10 w-24 text-xs md:w-full  bg-[#7B1984] text-white rounded-full font-[Mulish] font-bold">
            Add Task
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl sm:rounded-2xl px-0 overflow-hidden">
          <DialogHeader className=" bg-white border-b-2 h-16 px-4">
            <DialogTitle className="font-mulish font-semibold text-2xl">
              Create Task
            </DialogTitle>
          </DialogHeader>
          <div className="w-full h-fit flex flex-col  gap-y-3 px-4">
            <input
              type="text"
              className="h-10 rounded-lg bg-[#fafafa] font-mulish font-normal text-sm text-[#1E212A] border border-black/15 pl-4"
              placeholder="Task Title"
            />
            <textarea
              name="task-description"
              id="description"
              className="rounded-lg bg-[#fafafa] font-mulish font-normal text-sm text-[#1E212A] border border-black/15 pl-4 resize-none p-2"
              placeholder="Task Title"
              rows={5}
            ></textarea>
            <div className="flex ">
              <div className="flex flex-col w-1/3 gap-y-2">
                <div className="font-mulish font-semibold text-xs ">
                  {" "}
                  Task Category*
                </div>
                <div className="flex gap-x-2">
                  <div className="h-8 grid place-items-center w-20 border border-black/20 rounded-full text-[10px] font-mulish font-bold ">
                    Work
                  </div>
                  <div className="h-8 grid place-items-center w-20 border border-black/20 rounded-full text-[10px] font-mulish font-bold ">
                    Personal
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-1/3 gap-y-2">
                <div className="font-mulish font-semibold text-xs ">
                  {" "}
                  Due Date*
                </div>
                <input
                  type="date"
                  name=""
                  id=""
                  className=" h-7 md:h-8 rounded-lg w-4/5 text-xs md:text-sm font-[Mulish] font-semibold text-black/60 border border-black/20 bg-[#fafafa] [&>svg]:text-black [&>svg]:size-3  "
                />
              </div>
              <div className="flex flex-col w-1/3 gap-y-2">
                <div className="font-mulish font-semibold text-xs ">
                  {" "}
                  Task Status*
                </div>
                <Select>
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
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter></DialogFooter>
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

export default Task;
