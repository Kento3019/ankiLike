import { useNavigate } from "react-router-dom";
import { useStudySession } from "../hooks/useStudySession";
import Button from "../components/UI/Button";
import SpeakerIcon from "../components/UI/icon/SpeakerIcon";
import { useCard } from "../context/CardProvider";
import { useSpeak } from "../hooks/useSpeak";

export const Study = () => {
    const {
        studySession,
        assessments,
        twoSideCard,
        setTwoSideCard,
        requestQuizResult,
    } = useStudySession();
    const { setCard } = useCard();
    const { speak } = useSpeak();
    const navigate = useNavigate();

    // TODO: 外部から設定可能にする
    const QUIZ_MODE = true;

    if (!studySession || studySession.cards.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4">
                <p className="text-xl font-bold">Congratulations!</p>
                <p className="text-xl font-bold">You have finished this deck for now.</p>
                <Button onClick={() => navigate("/decks")}>Return to Decks</Button>
            </div>
        );
    }

    const currentCard = studySession.cards[studySession.currentIndex];

    const handleNext = (result: string) => {
        requestQuizResult(currentCard, result);
        const nextCard = studySession.cards[studySession.currentIndex + 1];
        if (nextCard) speak(nextCard.front);
    };

    const handleEdit = () => {
        setCard(currentCard);
        navigate(`/update`);
    };

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center text-center p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div>{currentCard.front}</div>
                <button
                    className="pr-2 cursor-pointer"
                    onClick={() => speak(currentCard.front)}
                >
                    <SpeakerIcon />
                </button>
            </div>

            {!QUIZ_MODE ? (
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
                        {currentCard.back}
                    </div>
                    <div className="flex justify-center space-x-2 mt-2">
                        {assessments.map((assessment) => (
                            <Button
                                key={assessment}
                                onClick={() => requestQuizResult(currentCard, assessment)}
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
