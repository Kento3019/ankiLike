import { useState } from "react";
import { Card } from "../types/Card";

export const useAddCard = (deckId: string) => {
    const [formData, setFormData] = useState<Card>({
        cardId: "",
        deckId,
        typeCd: "text",
        front: "",
        back: "",
        tag: "",
        statusCd: "new",
        lastStudiedDatetime: Date().toString(),
        nextSpan: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // APIを呼び出してカードを追加するなど
        alert("Card added successfully!");

        // フォームリセット
        setFormData(prev => ({
            ...prev,
            cardId: "",
            typeCd: "text",
            front: "",
            back: "",
            tag: "",
            statusCd: "new",
            lastStudiedDatetime: Date().toString(),
            nextSpan: 0,
        }));
    };

    return { formData, handleChange, handleSubmit };
};
