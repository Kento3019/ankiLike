import { createContext } from "react";
import { AppSettingContextType } from "./AppSettingProvider";


export const AppSettingsContext = createContext<AppSettingContextType | undefined>(undefined);
