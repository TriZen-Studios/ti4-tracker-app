import React, { createContext, useState, useEffect, useContext, useReducer } from "react";
import _ from "lodash";
import { AppContext, AppContextProvider } from "./AppContext";
import createReducer from "../reducer";
import { handlers } from "../reducer/handlers";
import WebSocketClient from "../WebSocketClient";
import { useRef } from "react";
import SessionContextProvider, { SessionContext } from "./SessionContext";

export const MultiplayerContext = createContext<any>({});

export interface MultiplayerContextProvider {
  state: any;
  sendRequest: (action: string, data?: any) => void;
}

export default function MultiplayerContextProvider(props) {
  const { isEmulator } = useContext(AppContext) as AppContextProvider;
  // special address that is the host computer
  const localhost = isEmulator ? "10.0.2.2" : "localhost";
  const initialState = {
    serverUrl: `ws://${localhost}:3000`,
    webSocket: new WebSocket(`ws://${localhost}:3000`)
  };

  const [state] = useState(initialState);

  // need to keep track of the latest state to prevent stale values from being read in function closures
  const _state = useRef(null);
  _state.current = state;

  function sendRequest(action: string, data: any = {}) {
    const json = {
      action,
      data
    };
    _state.current.webSocket.send(JSON.stringify(json));
  }

  const value: MultiplayerContextProvider = {
    state,
    sendRequest
  };

  return (
    <MultiplayerContext.Provider value={value}>
      <SessionContextProvider>
        <WebSocketClient webSocket={state.webSocket}>{props.children}</WebSocketClient>
      </SessionContextProvider>
    </MultiplayerContext.Provider>
  );
}
