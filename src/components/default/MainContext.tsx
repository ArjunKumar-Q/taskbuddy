import { ListContainer } from "@/components/List/ListContainer";
import { Accordion } from "../ui/accordion";
import useTask from "@/hooks/useTask";
import { BoardContainer } from "../Board/BoardContainer";

export function MainContext() {
  const [state] = useTask();

  if (state.viewType === "list") {
    return (
      <>
        <div className="my-8"></div>
        <div className="   w-full  px-4 py-2 lg:p-0 ">
          <Accordion type="multiple" className="flex flex-col gap-y-6 ">
            <ListContainer
              title="Todo"
              bgColor="bg-[#FAC3FF]"
              caretColor="text-[#3E0344]"
              isTodoContainer
            />
            <ListContainer
              title="In-Progress"
              bgColor="bg-[#85D9F1]"
              caretColor="text-[#3E0344]"
            />
            <ListContainer
              title="Completed"
              bgColor="bg-[#CEFFCC]"
              caretColor="text-[#0D7A0A]"
            />
          </Accordion>
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
        <BoardContainer title="TO-DO" cardColor="bg-[#FAC3FF]" />
        <BoardContainer title="IN-PROGRESS" cardColor="bg-[#85D9F1]" />
        <BoardContainer title="COMPLETED" cardColor="bg-[#CEFFCC]" />
      </div>
    </>
  );
}
