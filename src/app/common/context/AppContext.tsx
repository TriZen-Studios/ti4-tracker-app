import React, { createContext, useState, useEffect } from "react";
import DeviceInfo from "react-native-device-info";
import _ from "lodash";

export const AppContext = createContext(null);

export interface AppContextProvider {
  isEmulator: boolean;
  uniqueId: string;
}

export default function AppContextProvider(props) {
  const [isEmulator, setIsEmulator] = useState<boolean>(false);
  const [uniqueId] = useState<string>(DeviceInfo.getUniqueId());

  useEffect(() => {
    DeviceInfo.isEmulator().then((result) => setIsEmulator(result));
  }, []);

  const value: AppContextProvider = {
    isEmulator,
    uniqueId
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
