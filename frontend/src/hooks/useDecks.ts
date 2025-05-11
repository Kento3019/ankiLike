import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Deck } from "../types/Deck";
import { useCard } from "../context/Card/useCard";
import { useDeck } from "../context/Deck/useDeck";
import {
    fetchDeckList,
    createDeck as apiCreateDeck,
    updateDeck as apiUpdateDeck,
    deleteDeck as apiDeleteDeck
} from "../api/deckApi";

const INITIAL_DECK: Deck = {
    deckId: "",
    name: "",
    cardCount: 0,
    newCount: 0,
    learningCount: 0,
    reviewCount: 0,
};

export const useDecks = () => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [selectedDeck, setSelectedDeck] = useState<Deck>(INITIAL_DECK);
    const [isCreateEditModalOpen, setCreateEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const { setCard } = useCard();
    const { setDeck } = useDeck();
    const navigate = useNavigate();

    const loadDecks = useCallback(async () => {
        try {
            const decks = await fetchDeckList();
            setDecks(decks);
        } catch (error) {
            console.error("Error loading decks:", error);
            toast.error("An error occurred while loading the decks");
        }
    }, []);

    const handleDeckApi = async (
        apiFunc: (deck: Deck) => Promise<void>,
        successMessage: string
    ) => {
        if (!selectedDeck.name.trim()) {
            toast.warn("Please enter a deck name.");
            return;
        }

        try {
            await apiFunc(selectedDeck);
            toast.success(successMessage);
            await loadDecks();
            setSelectedDeck(INITIAL_DECK);
        } catch (error) {
            console.error(`Deck ${successMessage} failed:`, error);
            toast.error(`Failed to ${successMessage.toLowerCase()}`);
        }
    };

    const createDeck = () => handleDeckApi(apiCreateDeck, "Deck Created");
    const updateDeck = () => handleDeckApi(apiUpdateDeck, "Deck Updated");
    const deleteDeck = () => handleDeckApi(apiDeleteDeck, "Deck Deleted");

    const handleNavigation = (path: string, deck: Deck, clearCard = false) => {
        setDeck(deck);
        if (clearCard) setCard(undefined);
        navigate(path);
    };

    const handleDeckAction = (action: "edit" | "delete", deck: Deck) => {
        setSelectedDeck({ ...deck });
        if (action === "edit") {
            setCreateEditModalOpen(true);
        } else {
            setDeleteModalOpen(true);
        }
    };

    const handleCloseModals = () => {
        setCreateEditModalOpen(false);
        setDeleteModalOpen(false);
    };

    const handleSubmitDeck = () => {
        if (selectedDeck.deckId === "") {
            createDeck();
        } else {
            updateDeck();
            handleCloseModals();
        }
    };

    useEffect(() => {
        loadDecks();
    }, [loadDecks]);

    return {
        decks,
        selectedDeck,
        isCreateEditModalOpen,
        isDeleteModalOpen,
        handleNavigation,
        handleDeckAction,
        handleCloseModals,
        handleSubmitDeck,
        setSelectedDeck,
        setCreateEditModalOpen,
        createDeck,
        updateDeck,
        deleteDeck,
    };
};
