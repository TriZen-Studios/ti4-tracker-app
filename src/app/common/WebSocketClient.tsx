import { useContext } from "react";
import { MultiplayerContext, MultiplayerContextProvider } from "./context/MultiplayerContext";
import _ from "lodash";
import { SessionContext, SessionContextProviderValue } from "./context/SessionContext";

export default function WebSocketClient(props) {
  const { updateProp } = useContext(SessionContext) as SessionContextProviderValue;

  const webSocket: WebSocket = props.webSocket;
  webSocket.onmessage = (e) => {
    try {
      const parsedData = JSON.parse(e.data);
      const action = parsedData.action;

      switch (action) {
        case "UPDATE_STATE":
          let path = parsedData.path;
          let value = parsedData.value;
          updateProp(path, value);
          break;
        default:
          throw new Error(`${action} not implemented`);
      }
    } catch (err) {
      const error = {
        message: "Unabled to parse incoming message",
        err
      };
      console.error(error);
    }
  };

  return props.children;
}
