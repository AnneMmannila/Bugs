import Redux, { createStore } from "redux";

//Action
export function logIn(value) {
  return {
    type: "logIn",
    valueOfState: value,
  };
}

//Reducer
export function changeLogInValue(state, action) {
  if (state == undefined) {
    state = false;
  }
  if (action.type == "logIn") {
    return action.valueOfState;
  } else {
    return (state = false);
  }
}

export const store = createStore(changeLogInValue);
