import React, { createContext, useState, useEffect, useContext, useReducer } from "react";
import _ from "lodash";
import { AppContext, AppContextProvider } from "./AppContext";
import createReducer from "../reducer";
import { handlers } from "../reducer/handlers";
import WebSocketClient from "../WebSocketClient";
import { useRef } from "react";

export const SessionContext = createContext<any>({});

export interface SessionContextProviderValue {
  state: any;
  updateProp: (path: string, value: any) => void | any;
  deleteProp: (path: string) => void | any;
  reset: (value: any) => void | any;
}

export default function SessionContextProvider(props) {
  const { uniqueId } = useContext(AppContext) as AppContextProvider;
  const initialState = {
    sessions: {}, // dont change, this data comes from the game server
    player: {
      sessionId: null,
      id: uniqueId,
      name: uniqueId.substr(0, 7).toUpperCase(),
      faction: null
    }
  };
  const reducer = createReducer(initialState, handlers);
  const [state, dispatch] = useReducer(reducer, initialState);

  // need to keep track of the latest state to prevent stale values from being read in function closures
  // const _state = useRef(null);
  // _state.current = state;

  function updateProp(path: string, value: any) {
    // updates the state in the store
    dispatch({
      type: "updateProp",
      path,
      value
    });
  }

  function deleteProp(path: string) {
    dispatch({
      type: "deleteProp",
      path,
      value: null
    });
  }

  function reset(value: any) {
    dispatch({
      type: "reset",
      path: null,
      value
    });
  }

  const value: SessionContextProviderValue = {
    state,
    updateProp,
    deleteProp,
    reset
  };

  return <SessionContext.Provider value={value}>{props.children}</SessionContext.Provider>;
}
