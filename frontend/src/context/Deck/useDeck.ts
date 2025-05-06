import { useContext } from "react";
import { DeckContext, DeckContextType } from "./deckContext";

export const useDeck = (): DeckContextType => {
    const context = useContext(DeckContext);
    if (!context) {
        throw new Error("useDeck must be used within a DeckProvider");
    }
    return context;
}
