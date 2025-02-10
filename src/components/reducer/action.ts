export function reducerFn(state, action) {
  switch (action.type) {
    case "VIEW_CHANGE":
        console.log(action.payload.value)
      return {
        ...state,
        viewType: action.payload.value,
      };

    default:
      console.log("this is from the default function");
      return state;
  }
}
