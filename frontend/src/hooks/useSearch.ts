import { useEffect, useState } from "react";
import { Card } from "../types/Card";
import { useDeck } from "../context/Deck/useDeck";
import { fetchCardList } from "../api/cardApi";

export const useSearch = () => {
    const { deck } = useDeck();
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        const deckId = deck?.deckId || "";
        if (!deckId) return;

        const fetchCards = async () => {

            const cards = await fetchCardList(deckId);
            setCards(cards);
        };

        if (deckId) {
            fetchCards();
        }
    }, [deck]);

    return { cards };
};
