import { useState, useEffect } from "react";
import { StudySession } from "../types/StudySession";
import { Card } from "../types/Card";
import { useDeck } from "../context/DeckProvider";
import { useCard } from "../context/CardProvider";
import { useSpeak } from "./useSpeak";

const ASSESSMENTS = ["Again", "Hard", "Good", "Easy"];

const shuffle = <T,>(array: T[]): T[] => {
    const out = [...array];
    for (let i = out.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [out[i], out[r]] = [out[r], out[i]];
    }
    return out;
};

export const useStudySession = () => {
    const { deck } = useDeck();
    const { card, setCard } = useCard();
    const { speak } = useSpeak();

    const [studySession, setStudySession] = useState<StudySession | null>(null);
    const [assessments, setAssessments] = useState<string[]>([]);
    const [twoSideCard, setTwoSideCard] = useState(false);

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const init = async () => {
            if (!deck?.deckId) return;

            setAssessments(ASSESSMENTS);
            await startStudySession(deck.deckId);
        };

        init();
    }, []);

    const startStudySession = async (deckId: string) => {
        try {
            const query = new URLSearchParams({ deckId });
            const response = await fetch(`${apiBaseUrl}/api/card/quiz-list?${query}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const cards: Card[] = await response.json();
            const shuffled = shuffle(cards);
            const currentIndex = shuffled.findIndex(c => c.cardId === card?.cardId);

            const session: StudySession = {
                deckId,
                cards: shuffled,
                currentIndex: currentIndex >= 0 ? currentIndex : 0,
                totalCards: 0,
                limit: 10,
            };

            setStudySession(session);
            setCard(undefined); // 現在のカードは一度クリア
            speak(session.cards[session.currentIndex].front); // 音声再生
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };

    const requestQuizResult = async (card: Card, result: string) => {
        try {
            const response = await fetch(`${apiBaseUrl}/api/card/quiz-result`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cardId: card.cardId, result }),
            });

            if (!response.ok) return;

            setTwoSideCard(false);

            setStudySession(prev => {
                if (!prev) return prev;

                const nextIndex = prev.currentIndex + 1;
                speak(prev.cards[nextIndex].front); // 音声再生

                if (nextIndex < prev.cards.length) {
                    return { ...prev, currentIndex: nextIndex };
                }

                return null; // 終了
            });
        } catch (error) {
            console.error("Failed to send quiz result:", error);
        }
    };

    return {
        studySession,
        assessments,
        twoSideCard,
        setTwoSideCard,
        requestQuizResult,
    };
};
