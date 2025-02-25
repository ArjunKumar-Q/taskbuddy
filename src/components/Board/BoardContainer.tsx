import { DndContext, DragOverlay, useDroppable } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import BoardItem from "./BoardItem";
import { useEffect, useState } from "react";
import { MetaData } from "../List/ListContainer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Auth, getTasks } from "../authentication/RequestFunctions";
import { Task } from "../List/ListItem";
import { LoaderCircle } from "lucide-react";
import { User } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";

export function BoardContainer({ meta }: { meta: MetaData }) {
  const { title, bgColor, queryToken } = meta;
  const [tasks, setTasks] = useState<Task[]>([]);
  const { setNodeRef } = useDroppable({ id: title });
  const [isDragging, setIsDragging] = useState<{
    active: boolean;
    task: Task | null;
  }>({
    active: false,
    task: null,
  });

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
    console.log(data);
    if (data) {
      setTasks(data);
    }
  }, [data]);

  return (
    <DndContext
      onDragStart={({ active }) => {
        console.log(active.data.current);
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
      <div
        className={cn(
          " w-96 bg-[#f1f1f1] rounded-2xl border border-[#58575107]",
          !tasks.length ? "h-full" : "h-fit"
        )}
      >
        <div className="h-12  flex items-center px-3">
          <div className={cn("h-7 w-fit px-4 rounded-lg", bgColor)}>
            <span className="font-mulish font-semibold text-sm text-black">
              {title.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="my-4"></div>

        {isLoading && (
          <div className="text-center w-full h-60 font-mulish font-medium text-[#2F2F2F] grid place-items-center ">
            <LoaderCircle className="size-4 spin" /> Loading {title}
          </div>
        )}

        {tasks.length === 0 ? (
          <div className="text-center w-full h-5/6 font-mulish font-medium text-[#2F2F2F] grid place-items-center ">
            No task in {title}
          </div>
        ) : (
          <div ref={setNodeRef} className="w-full px-3  ">
            <SortableContext items={tasks}>
              {tasks.map((task) => {
                return <BoardItem task={task}   />;
              })}
            </SortableContext>
          </div>
        )}
        <div className="my-4"></div>
      </div>
      <DragOverlay>
        {isDragging.active && <BoardItem task={isDragging.task as Task} overlay />}
      </DragOverlay>
    </DndContext>
  );
}
