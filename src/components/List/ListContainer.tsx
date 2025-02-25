import {
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "../ui/accordion";
import { cn } from "@/lib/utils";
import ListItem from "./ListItem";
import MiniTaskForm from "../Task/MiniTaskCreateForm";
import { db, app } from "@/firebase";
import useTask from "@/hooks/useTask";
import { Task } from "./ListItem";

import { useEffect, useState } from "react";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
} from "@tanstack/react-query";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, User } from "firebase/auth";
import { LoaderCircle } from "lucide-react";

export type MetaData = {
  title: string;
  isTodoContainer?: boolean;
  bgColor: string;
  caretColor?: string;
  queryToken: string;
};

const Auth = getAuth(app);

async function getTasks(queryFor: string) {
  const docResults = await getDoc(
    doc(db, "users", (Auth.currentUser as User).uid)
  );
  return docResults.data()?.todos[queryFor];
}

export function ListContainer({ meta }: { meta: MetaData }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDragging, setIsDragging] = useState<{
    active: boolean;
    task: Task | null;
  }>({
    active: false,
    task: null,
  });
  const {
    title,
    isTodoContainer = false,
    bgColor,
    caretColor,
    queryToken,
  } = meta;
  const [state] = useTask();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [queryToken],
    queryFn: () => getTasks(queryToken),
  });

  const { mutate } = useMutation({
    mutationFn: updatePositions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryToken] });
    },
  });

  async function updatePositions(updatedArray: Task[]) {
    await updateDoc(doc(db, "users", (Auth.currentUser as User).uid), {
      [`todos.${queryToken}`]: updatedArray,
    });
  }

  useEffect(() => {
    if (data) {
      const sortedTasks = [...data];
      if (state.sortDate) {
        sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      } else {
        sortedTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
      }

      setTasks(sortedTasks);
    }
  }, [data, state.sortDate]);

  return (
    <DndContext
      onDragStart={({ active }) => {
        console.log(active);
        setIsDragging({
          active: true,
          task: tasks.filter(({ title }) => active.id === title)[0],
        });
      }}
      onDragEnd={(event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
          setTasks((items) => {
            const oldIndex = items.findIndex(
              (item) => item.title === active?.id
            );
            const newIndex = items.findIndex((item) => item.title === over?.id);
            const updatedArray = arrayMove(items, oldIndex, newIndex);
            mutate(updatedArray);
            return updatedArray;
          });
        }
      }}
    >
      <div className="w-full h-fit ">
        <AccordionItem
          value={title}
          className={cn(
            "border-none",
            state.searchQuery !== undefined &&
              tasks.filter((item) => item.title?.includes(state.searchQuery))
                .length === 0 &&
              "hidden",
            state.category !== undefined &&
              tasks.filter((item) => item.category === state.category)
                .length === 0 &&
              "hidden",
            state.dueDate !== undefined &&
              tasks.filter((item) => item.dueDate === state.dueDate).length ===
                0 &&
              "hidden"
          )}
        >
          <AccordionTrigger
            className={`h-10  font-[Mulish] font-semibold rounded-xl px-3 ${bgColor} ${
              "[&>svg]:" + caretColor
            } shadow-none [&[data-state=open]]:rounded-b-none`}
          >
            {title} ({tasks.length})
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              "bg-[#F1F1F1] rounded-b-xl min-h-fit w-full p-0 overflow-hidden",
              isTodoContainer && !tasks?.length && "min-h-72"
            )}
          >
            {isTodoContainer && state.searchQuery === undefined && (
              <MiniTaskForm />
            )}

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
                {tasks.map((item, index) => (
                  <ListItem
                    key={item.title}
                    task={item}
                    borderless={tasks.length === index + 1}
                  />
                ))}
              </SortableContext>
            )}

            {isTodoContainer && state.searchQuery !== undefined && (
              <MiniTaskForm borderless />
            )}
          </AccordionContent>
        </AccordionItem>
      </div>
      <DragOverlay>
        {isDragging.active && (
          <ListItem task={isDragging.task as Task} isOverlay />
        )}
      </DragOverlay>
    </DndContext>
  );
}
