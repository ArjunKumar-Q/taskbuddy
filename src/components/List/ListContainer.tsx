import {
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "../ui/accordion";
import { cn } from "@/lib/utils";
import ListItem from "./ListItem";
import MiniTaskForm from "../Task/MiniTaskCreateForm";
import { db, app } from "@/firebase";

import { useEffect, useState } from "react";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { LoaderCircle } from "lucide-react";

type ListMetaData = {
  title: string;
  isTodoContainer?: boolean;
  bgColor: string;
  caretColor: string;
  queryToken: string;
};

const Auth = getAuth(app);

async function getTasks(queryFor: string) {
  const docResults = await getDoc(doc(db, "users", Auth.currentUser.uid));
  return docResults.data()?.todos[queryFor];
}


export function ListContainer({ meta }: { meta: ListMetaData }) {
  const [tasks, setTasks] = useState([]);
  const {
    title,
    isTodoContainer = false,
    bgColor,
    caretColor,
    queryToken,
  } = meta;
  const { data, isError, isLoading } = useQuery({
    queryKey: [queryToken],
    queryFn: () => getTasks(queryToken),
  });

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  return (
    <DndContext
      onDragEnd={(event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
          setTasks((items) => {
            const oldIndex = items.findIndex(
              (item) => item.title === active?.id
            );
            const newIndex = items.findIndex((item) => item.title === over?.id);
            console.log(oldIndex, newIndex);

            return arrayMove(items, oldIndex, newIndex);
          });
        }
      }}
    >
      <div className="w-full">
        <AccordionItem value={title} className="border-none">
          <AccordionTrigger
            className={`h-10  font-[Mulish] font-semibold rounded-xl px-3 ${bgColor} ${
              "[&>svg]:" + caretColor
            } shadow-none [&[data-state=open]]:rounded-b-none`}
          >
            {title}
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              "bg-[#F1F1F1] rounded-b-xl min-h-40 w-full ",
              isTodoContainer && !tasks?.length && "min-h-72"
            )}
          >
            {isTodoContainer && <MiniTaskForm />}

            {isLoading && (
              <div className="text-center w-full h-60 font-mulish font-medium text-[#2F2F2F] grid place-items-center ">
                <LoaderCircle className="size-4 spin" /> Loading {title}
              </div>
            )}

            {tasks.length === 0 ? (
              <div className="text-center w-full h-60 font-mulish font-medium text-[#2F2F2F] grid place-items-center ">
                No task in {title}
              </div>
            ) : (
              <SortableContext items={tasks}>
                {tasks.map((item) => {
                  return <ListItem key={item.title} task={item} />;
                })}
              </SortableContext>
            )}
          </AccordionContent>
        </AccordionItem>
      </div>
      <DragOverlay>hi there</DragOverlay>
    </DndContext>
  );
}
