import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { Deck } from "../types/Deck";

const INITIAL_DECK: Deck = {
    deckId: "",
    name: "",
    cardCount: 0,
    newCount: 0,
    learningCount: 0,
    reviewCount: 0,
};

const API_ENDPOINTS = {
    LIST: "/api/deck/list",
    CREATE: "/api/deck/create",
    UPDATE: "/api/deck/update",
    DELETE: "/api/deck/delete",
};

export const useDecks = () => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [selectedDeck, setSelectedDeck] = useState<Deck>(INITIAL_DECK);

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const loadDecks = useCallback(async () => {
        try {
            const response = await fetch(`${apiBaseUrl}${API_ENDPOINTS.LIST}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error("Failed to load decks");

            const data = await response.json();
            setDecks(data);
        } catch (error) {
            console.error("Error loading decks:", error);
            toast.error("An error occurred while loading the decks");
        }
    }, [apiBaseUrl]);

    const postDeck = async (endpoint: string, successMessage: string) => {
        if (!selectedDeck.name.trim()) {
            toast.warn("Please enter a deck name.");
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(selectedDeck),
            });

            if (response.ok) {
                toast.success(successMessage);
                await loadDecks();
                setSelectedDeck(INITIAL_DECK);
            } else {
                toast.error(`Failed to ${successMessage.toLowerCase()}`);
            }
        } catch (error) {
            console.error("Error during deck operation:", error);
            toast.error("Network error has occurred");
        }
    };

    const createDeck = () => postDeck(API_ENDPOINTS.CREATE, "Deck Created");
    const updateDeck = () => postDeck(API_ENDPOINTS.UPDATE, "Deck Updated");
    const deleteDeck = () => postDeck(API_ENDPOINTS.DELETE, "Deck Deleted");

    useEffect(() => {
        loadDecks();
    }, [loadDecks]);

    return {
        decks,
        selectedDeck,
        setSelectedDeck,
        createDeck,
        updateDeck,
        deleteDeck,
    };
};
