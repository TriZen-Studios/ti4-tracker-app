export type ActionTypes = "updateProp" | "deleteProp" | "reset";

export interface Action {
  type: ActionTypes;
  path: string;
  value: any;
}
