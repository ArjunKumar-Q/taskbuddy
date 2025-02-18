import { DndContext, DragOverlay, useDroppable } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import BoardItem from "./BoardItem";
import { useEffect, useState } from "react";
import { MetaData } from "../List/ListContainer";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../authentication/RequestFunctions";
import { Task } from "../List/ListItem";
import { LoaderCircle } from "lucide-react";

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

  const { data, isLoading } = useQuery({
    queryKey: [queryToken],
    queryFn: () => getTasks(queryToken),
  });

  useEffect(() => {
    console.log(data);
    if (data) {
      setTasks(data);
    }
  }, [data]);

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
        console.log(active, over);

        if (active.id !== over?.id) {
          setTasks((tasks) => {
            const oldIndex = tasks.indexOf(active?.id);
            const newIndex = tasks.indexOf(over?.id);
            console.log(oldIndex, newIndex);

            return arrayMove(tasks, oldIndex, newIndex);
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
        {isDragging.active && <BoardItem task={isDragging.task as Task} />}
      </DragOverlay>
    </DndContext>
  );
}
