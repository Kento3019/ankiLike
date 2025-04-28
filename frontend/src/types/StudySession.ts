import { Card } from "./Card";

export interface StudySession {
    deckId: string;
    cards: Card[];
    currentIndex: number;
    totalCards: number;
    limit: number;
}
