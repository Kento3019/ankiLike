import { useState, useEffect } from "react";
import { StudySession } from "../types/StudySession";

export const useStudySession = () => {
    const [studySession, setStudySession] = useState<StudySession | null>(null);
    const [assessments, setAssessments] = useState<string[]>([]);
    const [twoSideCard, setTwoSideCard] = useState(false);

    useEffect(() => {
        const startStudySession = async () => {
            // ここでAPIから学習セッションの情報を取得する処理を実装する
            const sessionData: StudySession = {
                deckId: "1",
                cards: [
                    { cardId: "1", deckId: "1", typeCd: "text", front: "Front 1", back: "Back 1", tag: "", statusCd: "new", lastStudiedDatetime: "", nextSpan: 0 },
                    { cardId: "2", deckId: "1", typeCd: "text", front: "Front 2", back: "Back 2", tag: "", statusCd: "new", lastStudiedDatetime: "", nextSpan: 0 },
                ],
                currentIndex: 0,
                totalCards: 0,
                limit: 10,
            };
            setStudySession(sessionData);
        };

        const loadAssessments = async () => {
            const assessmentsData = ["Again", "Hard", "Good", "Easy"];
            setAssessments(assessmentsData);
        };

        loadAssessments();
        startStudySession();
    }, []);

    const requestQuizResult = async (assessment: string) => {
        // ここでAPIを呼び出してクイズの結果を送信する処理を実装する
        // 例として、結果をコンソールに出力する
        console.log(`Quiz Result: ${assessment}`);

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
