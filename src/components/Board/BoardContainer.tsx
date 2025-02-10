import { DndContext } from "@dnd-kit/core"
import { SortableContext, } from "@dnd-kit/sortable"
import { cn } from "@/lib/utils"
import BoardItem from "./BoardItem"

export function BoardContainer({title = "Todo",cardColor}:{title:string,cardColor:string}){
    const data = false
    return(
        <div className={cn(" w-96 bg-[#f1f1f1] rounded-2xl border border-[#58575107] overflow-hidden", data ? "h-full" : "h-fit")}>
            <div className="h-12  flex items-center px-3">
                <div className={cn("h-7 w-fit px-4 rounded-lg",cardColor)}>
                <span className="font-mulish font-medium text-sm text-black">
                    {title}
                </span>
                </div>
            </div>
            <div className="my-4"></div>
            <div className="w-full px-3 overflow-y-auto ">
            <BoardItem item={{name:'arjun'}}/>
            <BoardItem item={{name:'arjun'}}/>
            <BoardItem item={{name:'arjun'}}/>
            <BoardItem item={{name:'arjun'}}/>
            </div>
            <div className="my-4"></div>
        </div>
    )
}