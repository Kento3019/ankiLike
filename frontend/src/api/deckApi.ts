import { apiGet, apiPost } from './client';
import { Deck } from '../types/Deck';

export const fetchDeckList = (): Promise<Deck[]> => {
    return apiGet<Deck[]>('/deck/list');
};

export const createDeck = (deck: Deck): Promise<void> => {
    return apiPost<Deck, void>('/deck/create', deck);
};

export const updateDeck = (deck: Deck): Promise<void> => {
    return apiPost<Deck, void>('/deck/update', deck);
};

export const deleteDeck = (deck: Deck): Promise<void> => {
    return apiPost<Deck, void>('/deck/delete', deck);
};
