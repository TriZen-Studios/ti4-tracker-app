import { useContext } from "react";
import { MultiplayerContext, MultiplayerContextProvider } from "./context/MultiplayerContext";
import _ from "lodash";

export default function WebSocketClient(props) {
  const { state, updateProp, deleteProp, reset } = useContext(MultiplayerContext) as MultiplayerContextProvider;

  const webSocket: WebSocket = props.webSocket;
  webSocket.onmessage = (e) => {
    try {
      const parsedData = JSON.parse(e.data);
      const action = parsedData.action;
      const data = parsedData.data;

      switch (action) {
        case "GET_GAME_SESSIONS":
          updateProp("sessions", data);
          break;
        default:
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
