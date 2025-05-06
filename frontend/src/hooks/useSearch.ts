import { useEffect, useState } from "react";
import { Card } from "../types/Card";
import { useDeck } from "../context/Deck/useDeck";

export const useSearch = () => {
    const { deck } = useDeck();
    const [cards, setCards] = useState<Card[]>([]);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        // ここでAPIからカードの情報を取得する処理を実装する
        // 例として、デッキIDが"1"のカードを取得する仮想のAPIを呼び出す
        const deckId = deck?.deckId || ""; // デッキIDを取得
        if (!deckId) return; // デッキIDがない場合は何もしない

        const fetchCards = async () => {

            const cards = await fetch(`${apiBaseUrl}/api/card/list?deckId=` + deckId, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
                .then((response) => response.json())
                .catch((error) => console.error("Error fetching cards:", error));

            setCards(cards);
        };

        if (deckId) {
            fetchCards();
        }
    }, [deck]);

    // const editCard = async (card: Card) => {
    // }

    return { cards };
};
