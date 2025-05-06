import { createContext } from "react";
import { Deck } from "../../types/Deck";

export type DeckContextType = {
    deck: Deck | undefined;
    setDeck: React.Dispatch<React.SetStateAction<Deck | undefined>>;
}

export const DeckContext = createContext<DeckContextType | undefined>(undefined);
