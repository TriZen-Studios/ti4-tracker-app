import React, {createContext, useState, useEffect} from "react";
import DeviceInfo from "react-native-device-info";
import _ from "lodash";

export const AppContext = createContext(null);

export interface AppContextProvider {
  isEmulator: boolean;
}

export default function MultiplayerContextProvider(props) {
  const [isEmulator, setIsEmulator] = useState<boolean>(false);

  useEffect(() => {
    DeviceInfo.isEmulator().then((result) => setIsEmulator(result));
  }, []);

  const value: AppContextProvider = {
    isEmulator
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
