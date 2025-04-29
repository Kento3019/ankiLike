import { useState, useEffect } from "react";
import { StudySession } from "../types/StudySession";
import { Card } from "../types/Card";

export const useStudySession = (deckId: string) => {
    const [studySession, setStudySession] = useState<StudySession | null>(null);
    const [assessments, setAssessments] = useState<string[]>([]);
    const [twoSideCard, setTwoSideCard] = useState(false);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const startStudySession = async () => {
            const queryparam = new URLSearchParams({ deckId });
            try {
                const response = await fetch(`${apiBaseUrl}/api/card/Quizlist?` + queryparam, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                const cards = await response.json();
                const sessionData: StudySession = {
                    deckId,
                    cards,
                    currentIndex: 0,
                    totalCards: 0,
                    limit: 10,
                };
                setStudySession(sessionData);

                console.log("Study session started:", sessionData);
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
        const response = await fetch(`${apiBaseUrl}/api/card/QuizResult`,
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
