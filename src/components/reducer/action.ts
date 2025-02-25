import { Task } from "../List/ListItem";


export function reducerFn(state: Task, action) {
  switch (action.type) {
    case "VIEW_CHANGE":
      console.log(action.payload.value);
      return {
        ...state,
        viewType: action.payload.value,
      };

    case "SEARCH":
      return {
        ...state,
        searchQuery: action.payload.value,
      };
    case "CATEGORY":
      return {
        ...state,
        category: action.payload.value,
      };
    case "RESET":
      return {
        ...state,
        category: undefined,
        dueDate: undefined,
      };
    case "SORT_DATE":
      return {
        ...state,
        sortDate: !state.sortDate,
      };

    case "SELECT_TASK":
      return {
        ...state,
        selectedTasks: [...state.selectedTasks, action.payload.task],
      };

    case "REMOVE_TASK":
      return {
        ...state,
        selectedTasks: state.selectedTasks.filter(
          ({ title }) => title !== action.payload.taskTitle
        ),
      };
    case "DUE_DATE":
      return {
        ...state,
        dueDate: action.payload.value,
      };
    case "SELECTED_TASKS_RESET":
      return {
        ...state,
        selectedTasks: [],
      }
    default:
      console.log("this is from the default function");
      return state;
  }
}
