export const useSpeak = () => {
    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // 英語(アメリカ)の音声を使用
        window.speechSynthesis.speak(utterance);
    };

    return { speak };
}
