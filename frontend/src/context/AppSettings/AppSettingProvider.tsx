import { useState } from "react";
import { AppSettingsContext } from "./appSettingContext";


export type AppSettingContextType = {
    quizMode: boolean;
    setQuizMode: React.Dispatch<React.SetStateAction<boolean>>;
};

type CardProviderProps = {
    children: React.ReactNode;
}
export const AppSettingsProvider = ({ children }: CardProviderProps) => {
    const [quizMode, setQuizMode] = useState(true);

    return (
        <AppSettingsContext.Provider value={{ quizMode, setQuizMode }}>
            {children}
        </AppSettingsContext.Provider>
    );
};
