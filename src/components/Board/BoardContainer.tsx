import { DndContext, useDroppable } from "@dnd-kit/core";
import { arrayMove, SortableContext,rectSortingStrategy } from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import BoardItem from "./BoardItem";
import { useState } from "react";

export function BoardContainer({
  title = "Todo",
  cardColor,
}: {
  title: string;
  cardColor: string;
}) {
  const data = false;
  const [items, setItems] = useState([1, 2, 3]);
  const { setNodeRef } = useDroppable({ id: title });

  return (
    <DndContext
      onDragEnd={(event) => {
        const { active, over } = event;
        console.log(active, over);

        if (active.id !== over?.id) {
          setItems((items) => {
            const oldIndex = items.indexOf(active?.id);
            const newIndex = items.indexOf(over?.id);
            console.log(oldIndex, newIndex);

            return arrayMove(items, oldIndex, newIndex);
          });
        }
      }}
    >
      <div
        className={cn(
          " w-96 bg-[#f1f1f1] rounded-2xl border border-[#58575107]",
          data ? "h-full" : "h-fit"
        )}
      >
        <div className="h-12  flex items-center px-3">
          <div className={cn("h-7 w-fit px-4 rounded-lg", cardColor)}>
            <span className="font-mulish font-medium text-sm text-black">
              {title}
            </span>
          </div>
        </div>
        <div className="my-4"></div>

        <div ref={setNodeRef} className="w-full px-3  ">
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {items.map((item) => {
              return <BoardItem item={item} />;
            })}
          </SortableContext>
        </div>
        <div className="my-4"></div>
      </div>
    </DndContext>
  );
}
