import { useState } from "react";
import { toast } from "react-toastify";
import { Card } from "../types/Card";
import { useCard } from "../context/Card/useCard";
import { useDeck } from "../context/Deck/useDeck";
import {
    createCard as apiCreateCard,
    updateCard as apiUpdateCard
} from "../api/cardApi";

export const useUpdateCard = () => {
    const { deck } = useDeck();
    const { card } = useCard();

    const [formData, setFormData] = useState<Card>({
        cardId: card?.cardId || "",
        deckId: deck?.deckId || "",
        typeCd: "text",
        front: card?.front || "",
        back: card?.back || "",
        statusCd: "NEW",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCardApi = async (
        apiFunc: (data: Card) => Promise<void>,
        successMessage: string
    ) => {
        try {
            await apiFunc(formData);
            toast.success(successMessage);
            resetFormData();  // Reset the form data after success
        } catch (error) {
            console.error("API Error:", error);
            toast.error("An error has occurred");
        }
    };

    const resetFormData = () => {
        setFormData({
            cardId: "",
            deckId: deck?.deckId || "",
            typeCd: "text",
            front: "",
            back: "",
            statusCd: "NEW",
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.cardId) {
            await handleCardApi(apiCreateCard, "Card has been Added");
        } else {
            await handleCardApi(apiUpdateCard, "Card has been Updated");
        }
    };

    return { formData, handleChange, handleSubmit };
};
