import { useState, useEffect } from "react";
import { Deck } from "../types/Deck";

export const useDecks = () => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [deckName, setDeckName] = useState("");

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const fetchDecks = async () => {
        // ここでAPIからデッキの情報を取得する処理を実装する

        console.log(apiBaseUrl);
        const data =
            fetch(`${apiBaseUrl}/api/deck/list`, { method: "GET", headers: { "Content-Type": "application/json" } })
                .then((response) => response.json())
                .catch((error) => console.error("Error fetching decks:", error));

        return data;
    };

    const loadDecks = async () => {
        const data = await fetchDecks();
        setDecks(data);
    };

    const createDeck = async () => {
        if (!deckName) {
            alert("デッキ名を入力してください。");
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/api/deck/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ deckId: "", name: deckName, cardCount: 0, newCount: 0, learningCount: 0, reviewCount: 0 }),
            });

            if (response.ok) {
                alert("デッキが作成されました。");
                await loadDecks(); // 通信成功後に呼び出す
            } else {
                alert("デッキの作成に失敗しました。");
            }
        } catch (error) {
            console.error("Error creating deck:", error);
        }
    };


    useEffect(() => {
        loadDecks();
    }, []);

    return { decks, deckName, setDeckName, createDeck };
};
