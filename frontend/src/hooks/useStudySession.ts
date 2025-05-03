import { useState, useEffect } from "react";
import { StudySession } from "../types/StudySession";
import { Card } from "../types/Card";
import { useDeck } from "../context/DeckProvider";
import { useCard } from "../context/CardProvider";

export const useStudySession = () => {
    const { deck } = useDeck();
    const { card, setCard } = useCard();
    const [studySession, setStudySession] = useState<StudySession | null>(null);
    const [assessments, setAssessments] = useState<string[]>([]);
    const [twoSideCard, setTwoSideCard] = useState(false);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const startStudySession = async () => {
            const deckId = deck?.deckId || "";
            if (!deckId) return; // デッキIDがない場合は何もしない

            const queryparam = new URLSearchParams({ deckId });
            try {
                const response = await fetch(`${apiBaseUrl}/api/card/quiz-list?` + queryparam, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                const cards = await response.json();

                const currentIndex = cards.findIndex((c: Card) => c.cardId === card?.cardId);


                const sessionData: StudySession = {
                    deckId,
                    cards,
                    currentIndex: currentIndex >= 0 ? currentIndex : 0,
                    totalCards: 0,
                    limit: 10,
                };
                setStudySession(sessionData);
                setCard(undefined);

            } catch (error) {
                console.error("Error fetching cards:", error);
            }

        };

        const loadAssessments = async () => {
            const assessmentsData = ["Again", "Hard", "Good", "Easy"];
            setAssessments(assessmentsData);
        };
        loadAssessments();
        startStudySession();
    }, []);

    const requestQuizResult = async (card: Card, result: string) => {
        console.log(card.cardId, result);
        const response = await fetch(`${apiBaseUrl}/api/card/quiz-result`,
            {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cardId: card.cardId, result })
            })

        if (!response.ok) {
            return;
        }
        setTwoSideCard(false);
        setStudySession(prev => {
            if (prev) {
                const nextIndex = prev.currentIndex + 1;
                if (nextIndex < prev.cards.length) {
                    return { ...prev, currentIndex: nextIndex };
                } else {
                    return null; // 学習終了
                }
            }
            return prev;
        });
    };

    return { studySession, assessments, twoSideCard, setTwoSideCard, requestQuizResult };
};
