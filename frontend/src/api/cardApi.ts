import { apiGet, apiPost } from './client';
import { Card } from '../types/Card';

export const fetchCardList = (deckId: string): Promise<Card[]> => {
    return apiGet(`/card/list?deckId=${deckId}`);
};

export const createCard = (card: Card): Promise<void> => {
    return apiPost('/card/create', card);
};

export const updateCard = (card: Card): Promise<void> => {
    return apiPost('/card/update', card);
};

export const postQuizResult = (cardId: string, result: string): Promise<void> => {
    return apiPost('/card/quiz-result', { cardId, result });
};

export const fetchQuizList = (deckId: string): Promise<Card[]> => {
    return apiGet(`/card/quiz-list?deckId=${deckId}`);
};
