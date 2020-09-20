import produce from "immer";
import { Action } from "./actions";
import { Handlers } from "./handlers";

export interface State {
  [property: string]: any;
}

export default function createReducer<S extends State, A extends Action>(initialState: S, handlers: Handlers<S, A>) {
  return function reducer(state: S = initialState, action: A): S {
    return produce(state, (draft) => {
      if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
        handlers[action.type](draft, action);
      }
    });
  };
}
