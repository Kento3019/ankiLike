import { useNavigate } from "react-router-dom";
import { useStudySession } from "../hooks/useStudySession"; // フックを読み込み

export const Study = () => {
    const { studySession, assessments, twoSideCard, setTwoSideCard, requestQuizResult } = useStudySession();
    const navigator = useNavigate();

    const navigateToDecks = () => {
        navigator("/decks");
    };

    return (
        <div className="study-container">
            <h1>Study Session</h1>
            {studySession ? (
                <div className="card-display">
                    <h2>{studySession.cards[studySession.currentIndex].front}</h2>
                    {!twoSideCard ? (
                        <button onClick={() => setTwoSideCard(true)}>Show Answer</button>
                    ) : (
                        <div className="answer-display">
                            <h2>{studySession.cards[studySession.currentIndex].back}</h2>
                            {assessments.map((assessment, index) => (
                                <button
                                    key={index}
                                    onClick={() => requestQuizResult(assessment)}
                                >
                                    {assessment}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <p>Congratulations! You have finished this deck for now.</p>
                    <button onClick={navigateToDecks}>Return to Decks</button>
                </>
            )}
        </div>
    );
};
