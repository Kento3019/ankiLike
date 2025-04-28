import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAddCard } from '../hooks/useAddCard'; // フックを読み込み

const Add = () => {
    const deckId = useLocation().pathname.split("/").pop() || "";
    const { formData, handleChange, handleSubmit } = useAddCard(deckId);

    return (
        <div>
            <h1>Add Card</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="deckId">Deck ID:</label>
                    <span>{formData.deckId}</span>
                </div>
                <div>
                    <label htmlFor="front">Front:</label>
                    <textarea id="front" name="front" value={formData.front} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="back">Back:</label>
                    <textarea id="back" name="back" value={formData.back} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="tag">Tag:</label>
                    <input type="text" id="tag" name="tag" value={formData.tag} onChange={handleChange} />
                </div>
                <button type="submit">Add Card</button>
            </form>
        </div>
    );
};

export default Add;
