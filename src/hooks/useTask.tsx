import { createContext,useContext } from "react";

const TaskbuddyContext = createContext(null)

export const TaskbuddyProvider = TaskbuddyContext.Provider

export default function useTask(){
    const {state,dispatch} = useContext(TaskbuddyContext)

    return [state,dispatch]
}