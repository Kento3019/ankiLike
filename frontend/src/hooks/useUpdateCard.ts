import { useState } from "react";
import { toast } from "react-toastify";
import { Card } from "../types/Card";
import { useDeck } from "../context/DeckProvider";
import { useCard } from "../context/CardProvider";

export const useUpdateCard = () => {
    const { deck } = useDeck();
    const { card } = useCard();
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

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

    const fetchCardApi = async (endpoint: string, data: Card, successMessage: string) => {
        try {
            const response = await fetch(`${apiBaseUrl}/api/card/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success(successMessage);
            } else {
                toast.error("Network error has occurred");
            }
        } catch (error) {
            console.error("API Error:", error);
            toast.error("Error has been occured");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.cardId) {
            await fetchCardApi("create", formData, "Card has been Added");

            setFormData((prev) => ({
                ...prev,
                cardId: "",
                typeCd: "text",
                front: "",
                back: "",
                tag: "",
                statusCd: "NEW",
                updatedAt: Date().toString(),
                nextSpan: 0,
            }));
        } else {
            await fetchCardApi("update", formData, "Card has been Updated");
        }
    };

    return { formData, handleChange, handleSubmit };
};
