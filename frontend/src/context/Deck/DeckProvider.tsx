import React from "react";
import { DeckContext } from "./deckContext";
import { Deck } from "../../types/Deck";

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
