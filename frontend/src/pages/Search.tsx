import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch'; // カスタムフックを読み込み

const Search: React.FC = () => {
    const deckId = useLocation().pathname.split("/").pop() || "";
    const { cards } = useSearch(deckId);

    return (
        <div>
            <h2>Cards</h2>
            {cards.length > 0 ? (
                <ul>
                    {cards.map((card) => (
                        <li key={card.cardId}>
                            <p>Front: {card.front}</p>
                            <p>Back: {card.back}</p>
                            <p>Status: {card.statusCd}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No cards found.</p>
            )}
        </div>
    );
};

export default Search;
