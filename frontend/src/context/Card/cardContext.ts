import { createContext } from "react";
import { Card } from "../../types/Card";

export type CardContextType = {
    card: Card | undefined;
    setCard: React.Dispatch<React.SetStateAction<Card | undefined>>;
}

export const CardContext = createContext<CardContextType | undefined>(undefined);
