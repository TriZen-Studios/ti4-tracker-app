import React, { createContext, useState, useEffect, useContext, useReducer } from "react";
import _ from "lodash";
import { AppContext, AppContextProvider } from "./AppContext";
import createReducer from "../reducer";
import { handlers } from "../reducer/handlers";
import WebSocketClient from "../WebSocketClient";
import { useRef } from "react";

export const MultiplayerContext = createContext<any>({});

export interface MultiplayerContextProvider {
  state: any;
  updateProp: (path: string, value: any) => void | any;
  deleteProp: (path: string) => void | any;
  reset: (value: any) => void | any;
  sendRequest: (action: string, data?: any) => void;
}

export default function MultiplayerContextProvider(props) {
  const { isEmulator } = useContext(AppContext) as AppContextProvider;
  // special address that is the host computer
  const localhost = isEmulator ? "10.0.2.2" : "localhost";
  const initialState = {
    serverUrl: `ws://${localhost}:3000`,
    webSocket: new WebSocket(`ws://${localhost}:3000`),
    sessions: {}
  };
  const reducer = createReducer(initialState, handlers);
  const [state, dispatch] = useReducer(reducer, initialState);

  // need to keep track of the latest state to prevent stale values from being read in function closures
  const _state = useRef(null);
  _state.current = state;

  function updateProp(path: string, value: any) {
    // updates the state in the store
    dispatch({
      type: "updateProp",
      path,
      value
    });
    // this does not update the state in the store but returns what the next state looks like
    // this is to bypass waiting for the next app render to get the latest state
    return _.set(state, path, value);
  }

  function deleteProp(path: string) {
    dispatch({
      type: "deleteProp",
      path,
      value: null
    });
    return _.unset(state, path);
  }

  function reset(value: any) {
    dispatch({
      type: "reset",
      path: null,
      value
    });
  }

  function sendRequest(action: string, data: any = {}) {
    const json = {
      action,
      data
    };
    _state.current.webSocket.send(JSON.stringify(json));
  }

  const value: MultiplayerContextProvider = {
    state,
    updateProp,
    deleteProp,
    reset,
    sendRequest
  };

  return (
    <MultiplayerContext.Provider value={value}>
      <WebSocketClient webSocket={state.webSocket}>{props.children}</WebSocketClient>
    </MultiplayerContext.Provider>
  );
}
