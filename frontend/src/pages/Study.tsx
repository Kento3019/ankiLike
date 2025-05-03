import { useNavigate } from "react-router-dom";
import { useStudySession } from "../hooks/useStudySession"; // フックを読み込み
import Button from "../components/UI/Button";
import SpeakerIcon from "../components/UI/icon/SpeakerIcon";
import { useCard } from "../context/CardProvider";
import { Card } from "../types/Card";
import { useSpeak } from "../hooks/useSpeak";

export const Study = () => {
    const { studySession, assessments, twoSideCard, setTwoSideCard, requestQuizResult } = useStudySession();
    const navigator = useNavigate();
    const { speak } = useSpeak();
    const { setCard } = useCard();


    const navigateToDecks = () => {
        navigator("/decks");
    };
    const navigateToUpdate = (card: Card) => {
        setCard(card);
        navigator(`/update/`);
    };

    return (
        <div className="">
            {studySession && studySession.cards.length > 0 ? (
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-center p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div>
                            {studySession.cards[studySession.currentIndex].front}
                        </div>
                        <button
                            className="pr-2 cursor-pointer"
                            onClick={() => speak(studySession.cards[studySession.currentIndex].front)}
                        >
                            <SpeakerIcon className="" />
                        </button>
                    </div>
                    {!twoSideCard ? (
                        <div className="flex justify-center mt-2 space-x-2">
                            <Button onClick={() => setTwoSideCard(true)}>Show Answer</Button>
                            <Button onClick={() => navigateToUpdate(studySession.cards[studySession.currentIndex])}>
                                Edit</Button>
                        </div>


                    ) : (
                        <div className="answer-display">
                            <div className="text-center p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                                {studySession.cards[studySession.currentIndex].back}
                            </div>
                            <div className="flex justify-center space-x-2 mt-2">
                                {assessments.map((assessment, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => requestQuizResult(studySession.cards[studySession.currentIndex], assessment)}
                                    >
                                        {assessment}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center space-y-4">
                    <p className="text-xl font-bold" >Congratulations!</p>
                    <p className="text-xl font-bold" >You have finished this deck for now.</p>
                    <Button onClick={navigateToDecks}>Return to Decks</Button>
                </div>
            )}
        </div>
    );
};
