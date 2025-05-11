import { useState, useEffect } from "react";
import { StudySession } from "../types/StudySession";
import { Card } from "../types/Card";
import { useSpeak } from "./useSpeak";
import { useNavigate } from "react-router-dom";
import { useCard } from "../context/Card/useCard";
import { useDeck } from "../context/Deck/useDeck";
import { shuffle } from "../utils/shuffle";
import { fetchQuizList, postQuizResult } from "../api/cardApi";

const ASSESSMENTS = ["Again", "Hard", "Good", "Easy"];

export const useStudySession = () => {
    const { deck } = useDeck();
    const { card, setCard } = useCard();
    const { speak } = useSpeak();
    const navigate = useNavigate();

    const [studySession, setStudySession] = useState<StudySession | null>(null);
    const [assessments, setAssessments] = useState<string[]>([]);
    const [twoSideCard, setTwoSideCard] = useState(false);

    const currentCard = studySession?.cards[studySession.currentIndex];

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
            const cards = await fetchQuizList(deckId);
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
            setCard(undefined);
            speak(session.cards[session.currentIndex].front);
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };

    const requestQuizResult = async (card: Card, result: string) => {
        try {
            await postQuizResult(card.cardId, result);

            setTwoSideCard(false);
            setStudySession(prev => {
                if (!prev) return prev;

                const nextIndex = prev.currentIndex + 1;
                if (nextIndex < prev.cards.length) {
                    speak(prev.cards[nextIndex].front);
                    return { ...prev, currentIndex: nextIndex };
                }

                return null;
            });
        } catch (error) {
            console.error("Failed to send quiz result:", error);
        }
    };

    const handleNext = (result: string) => {
        if (!currentCard) return;
        requestQuizResult(currentCard, result);
    };

    const handleEdit = () => {
        if (!currentCard) return;
        setCard(currentCard);
        navigate(`/cardform`);
    };

    return {
        studySession,
        assessments,
        twoSideCard,
        setTwoSideCard,
        requestQuizResult,
        currentCard,
        handleNext,
        handleEdit,
    };
};
