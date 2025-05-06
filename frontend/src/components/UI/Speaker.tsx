import { useSpeak } from "../../hooks/useSpeak";
import SpeakerIcon from "./icon/SpeakerIcon";

type Props = {
    text: string
    className?: string
}
export const Speaker = (props: Props) => {

    const { text, className } = props;
    const { speak } = useSpeak();

    return (
        <>
            <button
                className={`pr-2 cursor-pointer ${className}`}
                onClick={() => speak(text)}
            >
                <SpeakerIcon />
            </button>
        </>
    );
}
