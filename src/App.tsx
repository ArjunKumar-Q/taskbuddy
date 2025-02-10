import { Header, MainContext } from "./components/default";
import { useReducer } from "react";
import { state as initialState } from "@/components/reducer/state";
import { reducerFn } from "@/components/reducer/action";
import { TaskbuddyProvider } from "./hooks/useTask";

function App() {
  const [state, dispatch] = useReducer(reducerFn, initialState);
  return (
    <TaskbuddyProvider value={{ state, dispatch }}>
      <div className="min-h-screen  bg-white text-black  lg:p-4 lg:pt-10 lg:px-8 overflow-y-auto">
        <Header />
        <div className="mt-4"></div>
        <MainContext />
      </div>
    </TaskbuddyProvider>
  );
}

export default App;
