import { signOut } from "@firebase/auth";
import { auth } from "./firebase";
import { Header, MainContext } from "./components/default";
import { useReducer } from "react";
import { reducerFn } from "./components/reducer/action";
import { state as initialState } from "./components/reducer/state";
import { TaskbuddyProvider } from "./hooks/useTask";

function App() {
  const [state, dispatch] = useReducer(reducerFn, initialState);
  return (
    <TaskbuddyProvider value={{ state, dispatch }}>
      <div className="min-h-screen max-h-fit  bg-white text-black lg:p-4 lg:pt-10 lg:px-8 overflow-y-auto">
        <Header />
        <div className="mt-4"></div>
        <MainContext />
      </div>
    </TaskbuddyProvider>
  );
}

export default App;
