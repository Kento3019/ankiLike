import { useNavigate } from "react-router-dom";
import { useDecks } from "../hooks/useDecks"; // フックを読み込み

export const Decks = () => {
    const navigator = useNavigate();
    const { decks, deckName, setDeckName, createDeck } = useDecks();

    const navigateToStudy = (deckId: string) => {
        navigator(`/decks/study/${deckId}`);
    };
    const navigateToAdd = (deckId: string) => {
        navigator(`/add/${deckId}`);
    };
    const navigateToSearch = (deckId: string) => {
        navigator(`/search/${deckId}`);
    };

    return (
        <div className="decks-container">
            <h1>Decks</h1>
            <div className="decks-create">
                <h2>Create New Deck</h2>
                <input
                    type="text"
                    value={deckName}
                    placeholder="Deck Name"
                    onChange={(e) => setDeckName(e.target.value)}
                />
                <button style={{ color: 'black' }} onClick={createDeck}>
                    Create New Deck
                </button>
            </div>
            <table className="decks-table">
                <thead>
                    <tr>
                        <th>Deck Name</th>
                        <th>Total Cards</th>
                        <th>New</th>
                        <th>Learning</th>
                        <th>To Review</th>
                    </tr>
                </thead>
                <tbody>
                    {decks.map((deck) => (
                        <tr key={deck.deckId}>
                            <td>
                                <button
                                    style={{ color: 'black' }}
                                    onClick={() => navigateToStudy(deck.deckId)}
                                >
                                    {deck.name}
                                </button>
                            </td>
                            <td>{deck.cardCount}</td>
                            <td>{deck.newCount}</td>
                            <td>{deck.learningCount}</td>
                            <td>{deck.reviewCount}</td>
                            <td>
                                <button
                                    style={{ color: 'black' }}
                                    onClick={() => navigateToAdd(deck.deckId)}
                                >
                                    Add
                                </button>
                            </td>
                            <td>
                                <button
                                    style={{ color: 'black' }}
                                    onClick={() => navigateToSearch(deck.deckId)}
                                >
                                    Search
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
