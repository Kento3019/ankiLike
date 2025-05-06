export const shuffle = <T,>(array: T[]): T[] => {
    const out = [...array];
    for (let i = out.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [out[i], out[r]] = [out[r], out[i]];
    }
    return out;
};
