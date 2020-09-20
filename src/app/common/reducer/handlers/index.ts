import { Draft } from "immer";
import { State } from "..";
import { Action } from "../actions";
import _ from "lodash";

export interface Handlers<S, A> {
  [handler: string]: (draft: Draft<S>, action: A) => void | any;
}

export const handlers: Handlers<State, Action> = {
  updateProp(draft, action) {
    _.set(draft, action.path, action.value);
  },
  deleteProp(draft, action) {
    _.unset(draft, action.path);
  },
  reset(draft, action) {
    const fields = Object.keys(draft);
    _.merge(draft, _.pick(action.value, fields));
  }
};
