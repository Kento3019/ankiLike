import { useEffect, useState } from "react";
import { Deck } from "../types/Deck";
import { Card } from "../types/Card";

export const useSearch = (deckId: string) => {
    const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        // ここでAPIからデッキの情報を取得する処理を実装する
        // 例として、デッキIDが"1"のデッキを取得する仮想のAPIを呼び出す
        const fetchDeck = async () => {
            const mockDeck: Deck = {
                deckId: deckId || "1",
                name: "Sample Deck",
                cardCount: 10,
                newCount: 3,
                learningCount: 2,
                toReviewCount: 5,
            };
            setSelectedDeck(mockDeck);
        };
        // ここでAPIからカードの情報を取得する処理を実装する
        // 例として、デッキIDが"1"のカードを取得する仮想のAPIを呼び出す
        const fetchCards = async () => {
            const mockCards: Card[] = [
                {
                    cardId: "1",
                    deckId: deckId || "1",
                    typeCd: "text",
                    front: "Front 1",
                    back: "Back 1",
                    tag: "Tag 1",
                    statusCd: "new",
                    lastStudiedDatetime: new Date().toString(),
                    nextSpan: 0,
                },
                {
                    cardId: "2",
                    deckId: deckId || "1",
                    typeCd: "text",
                    front: "Front 2",
                    back: "Back 2",
                    tag: "Tag 2",
                    statusCd: "learning",
                    lastStudiedDatetime: new Date().toString(),
                    nextSpan: 0,
                },
            ];
            setCards(mockCards);
        };

        if (deckId) {
            fetchDeck();
            fetchCards();
        }
    }, [deckId]);

    return { selectedDeck, cards };
};
