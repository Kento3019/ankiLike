import { useState } from "react";
import { Card } from "../types/Card";

export const useAddCard = (deckId: string) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


    const [formData, setFormData] = useState<Card>({
        cardId: "",
        deckId,
        typeCd: "text",
        front: "",
        back: "",
        statusCd: "NEW",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Form Data:", formData); // デバッグ用
        // APIを呼び出してカードを追加するなど
        fetch(`${apiBaseUrl}/api/card/create`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) })
            .then(response => {
                if (response.ok) {
                    alert("カードが追加されました。");
                } else {
                    alert("カードの追加に失敗しました。");
                }
            })
            .catch(error => console.error("Error adding card:", error));

        // フォームリセット
        setFormData(prev => ({
            ...prev,
            cardId: "",
            typeCd: "text",
            front: "",
            back: "",
            tag: "",
            statusCd: "new",
            updatedAt: Date().toString(),
            nextSpan: 0,
        }));
    };

    return { formData, handleChange, handleSubmit };
};
