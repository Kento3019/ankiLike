export interface Card {
    cardId: string;
    deckId: string;
    typeCd: string;
    front: string;
    back: string;
    tag: string;
    statusCd: string;
    lastStudiedDatetime: string;
    nextSpan: number;
}
