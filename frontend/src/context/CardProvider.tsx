import React, { createContext, useContext } from "react";
import { Card } from "../types/Card"



type CardContextType = {
    card: Card | undefined;
    setCard: React.Dispatch<React.SetStateAction<Card | undefined>>;
}

export const CardContext = createContext<CardContextType | undefined>(undefined);

export const useCard = (): CardContextType => {
    const context = useContext(CardContext);
    if (!context) {
        throw new Error("useCard must be used within a CardProvider");
    }
    return context;
}

type CardProviderProps = {
    children: React.ReactNode;
}
export const CardProvider = ({ children }: CardProviderProps) => {
    const [card, setCard] = React.useState<Card | undefined>(undefined);

    return (
        <CardContext.Provider value={{ card, setCard }}>
            {children}
        </CardContext.Provider>
    );
}
