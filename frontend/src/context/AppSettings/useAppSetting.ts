import { useContext } from "react";
import { AppSettingContextType } from "./AppSettingProvider";
import { AppSettingsContext } from "./appSettingContext";

export const useAppSetting = (): AppSettingContextType => {
    const context = useContext(AppSettingsContext);
    if (!context) {
        throw new Error("useAppSetting must be used within a AppSettingProvider");
    }
    return context;
}
