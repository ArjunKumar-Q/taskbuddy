import { AccordionListContainer } from "@/components/List/Accordion";
import { Accordion } from "../ui/accordion";

export function MainContext() {
  return (
    <div className="h-96 w-full   px-4 py-2 lg:p-0 ">
      <Accordion type="multiple" className="flex flex-col gap-y-6">
        <AccordionListContainer title="Todo" color="#FAC3FF" symbolColor="#3E0344" isTodoContainer />
        <AccordionListContainer title="In-Progress" color={"#85D9F1"} symbolColor="3E0344" />
        <AccordionListContainer title="Completed" color={"#CEFFCC"} />
      </Accordion>
    </div>
  );
}
