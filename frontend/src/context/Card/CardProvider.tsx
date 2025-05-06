import React from "react";
import { Card } from "../../types/Card"
import { CardContext } from "./cardContext";


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
