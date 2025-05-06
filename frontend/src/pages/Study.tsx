// components/Study.tsx
import { useNavigate } from "react-router-dom";
import { useStudySession } from "../hooks/useStudySession";
import Button from "../components/UI/Button";
import { Speaker } from "../components/UI/Speaker";
import { useAppSetting } from "../context/AppSettings/useAppSetting";

export const Study = () => {
    const {
        studySession,
        assessments,
        twoSideCard,
        setTwoSideCard,
        currentCard,
        handleNext,
        handleEdit,
    } = useStudySession();

    const navigate = useNavigate();
    const { quizMode } = useAppSetting();

    if (!studySession || studySession.cards.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4">
                <p className="text-xl font-bold">Congratulations!</p>
                <p className="text-xl font-bold">You have finished this deck for now.</p>
                <Button onClick={() => navigate("/decks")}>Return to Decks</Button>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center text-center p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div>{currentCard?.front}</div>
                {currentCard && <Speaker text={currentCard.front} />}
            </div>
            {!quizMode ? (
                <div className="flex justify-center mt-2 space-x-2">
                    <Button onClick={() => handleNext("Again")}>NEXT</Button>
                    <Button onClick={handleEdit}>Edit</Button>
                </div>
            ) : !twoSideCard ? (
                <div className="flex justify-center mt-2 space-x-2">
                    <Button onClick={() => setTwoSideCard(true)}>Show Answer</Button>
                    <Button onClick={handleEdit}>Edit</Button>
                </div>
            ) : (
                <div className="answer-display space-y-2">
                    <div className="text-center p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                        {currentCard?.back}
                    </div>
                    <div className="flex justify-center space-x-2 mt-2">
                        {assessments.map((assessment) => (
                            <Button
                                key={assessment}
                                onClick={() => handleNext(assessment)}
                            >
                                {assessment}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
