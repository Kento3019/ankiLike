import { useState, useEffect } from "react";
import { Deck } from "../types/Deck";

export const useDecks = () => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [deckName, setDeckName] = useState("");

    const fetchDecks = async () => {
        // ここでAPIからデッキの情報を取得する処理を実装する
        return [
            { deckId: "1", name: "Deck 1", cardCount: 10, newCount: 5, learningCount: 3, toReviewCount: 2 },
            { deckId: "2", name: "Deck 2", cardCount: 20, newCount: 10, learningCount: 5, toReviewCount: 5 },
            { deckId: "3", name: "Deck 3", cardCount: 15, newCount: 7, learningCount: 4, toReviewCount: 4 },
        ];
    };

    const loadDecks = async () => {
        const data = await fetchDecks();
        setDecks(data);
    };

    const createDeck = async () => {
        alert(`Deck "${deckName}" created!`);
        setDeckName("");
        loadDecks(); // 仮想：作ったらリスト更新
    };

    useEffect(() => {
        loadDecks();
    }, []);

    return { decks, deckName, setDeckName, createDeck };
};
