export const useSpeak = () => {
    const speak = (text: string) => {
        // 話し中の音声があればキャンセルしてから再生
        window.speechSynthesis.cancel(); // ←ここで一旦止める
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    const stop = () => {
        window.speechSynthesis.cancel();
    };

    return { speak, stop };
};
