import React, { createContext, useContext } from "react";
import { Deck } from "../types/Deck"



type DeckContextType = {
    deck: Deck | undefined;
    setDeck: React.Dispatch<React.SetStateAction<Deck | undefined>>;
}

export const DeckContext = createContext<DeckContextType | undefined>(undefined);

export const useDeck = (): DeckContextType => {
    const context = useContext(DeckContext);
    if (!context) {
        throw new Error("useDeck must be used within a DeckProvider");
    }
    return context;
}

type DeckProviderProps = {
    children: React.ReactNode;
}
export const DeckProvider = ({ children }: DeckProviderProps) => {
    const [deck, setDeck] = React.useState<Deck | undefined>(undefined);

    return (
        <DeckContext.Provider value={{ deck, setDeck }}>
            {children}
        </DeckContext.Provider>
    );
}
