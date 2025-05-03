import { useNavigate } from "react-router-dom";
import { useDecks } from "../hooks/useDecks";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { Modal } from "../components/UI/Modal";
import { useState } from "react";
import KebabMenu from "../components/UI/KebabMenu";
import { useFAB } from "../hooks/useFAB";
import { FAB } from "../components/UI/FAB";
import { NoteIcon } from "../components/UI/icon/NoteIcon";
import { useDeck } from "../context/DeckProvider";
import { Deck } from "../types/Deck";
import { useCard } from "../context/CardProvider";

export const Decks = () => {
    const navigator = useNavigate();
    const { decks, selectedDeck, setSelectedDeck, deleteDeck, createDeck, updateDeck } = useDecks();
    const [isOpen, setIsOpen] = useState(false);
    const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
    const { isOpenFAB, toggleFAB } = useFAB();
    const { setCard } = useCard();
    const { setDeck } = useDeck();

    const navigateToStudy = (deck: Deck) => {
        setDeck(deck);
        navigator(`/decks/study/`);
    };

    const navigateToUpdate = (deck: Deck) => {
        setCard(undefined);
        setDeck(deck);
        navigator(`/update/`);
    };

    const navigateToSearch = (deck: Deck) => {
        setDeck(deck);
        navigator(`/search/`);
    };

    // 重複を減らすために setSelectedDeck を関数化
    const handleSetSelectedDeck = (deck: Deck) => {
        setSelectedDeck({ ...deck });
    };

    // モーダル用の共通化した関数
    const handleModalClose = () => {
        setIsOpen(false);
        setIsDeletedModalOpen(false);
    };

    return (
        <div className="decks-container">
            <table className="w-full table-fixed mb-1">
                <tbody>
                    {decks.map((deck) => (
                        <tr className="bg-gray-100 border-b border-white" key={deck.deckId}>
                            <td className="px-2 py-1">
                                <div>
                                    <button
                                        className="font-bold text-left w-full"
                                        onClick={() => navigateToStudy(deck)}
                                    >
                                        {deck.name}
                                    </button>
                                </div>
                                <div className="space-x-1">
                                    <span className="text-gray-700 text-sm">{`Count:${deck.cardCount}`}</span>
                                    <span className="text-blue-500 text-sm">{`New:${deck.newCount}`}</span>
                                    <span className="text-green-500 text-sm">{`Learning:${deck.learningCount}`}</span>
                                    <span className="text-pink-500 text-sm">{`Review:${deck.reviewCount}`}</span>
                                </div>
                            </td>
                            <td className="px-2 py-2 text-right">
                                <div className="flex justify-end">
                                    <KebabMenu
                                        items={[
                                            { label: "Add", onClick: () => navigateToUpdate(deck) },
                                            {
                                                label: "Edit", onClick: () => {
                                                    handleSetSelectedDeck(deck);
                                                    setIsOpen(true);
                                                }
                                            },
                                            {
                                                label: "Delete", onClick: () => {
                                                    handleSetSelectedDeck(deck);
                                                    setIsDeletedModalOpen(true);
                                                }
                                            },
                                            { label: "Search", onClick: () => navigateToSearch(deck) },
                                        ]}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <FAB isOpenFAB={isOpenFAB} onClose={toggleFAB}>
                <div className='flex flex-col'>
                    <Button
                        className='rounded-full px-4 py-3 bg-green-600 text-white shadow-md hover:bg-green-500 active:bg-green-400 transition-all duration-200 ease-in-out'
                        onClick={() => {
                            setIsOpen(true);
                            toggleFAB();
                        }}
                    >
                        <p className='flex flex-row'>
                            <span className='mr-2'><NoteIcon /></span>
                            Create Deck
                        </p>
                    </Button>
                </div>
            </FAB>

            {/* デッキ作成・更新モーダル */}
            <Modal isOpen={isOpen} onClose={handleModalClose}>
                <div className=" bg-white m-2 p-4 rounded shadow-md space-y-2">
                    <Input
                        type="text"
                        value={selectedDeck.name}
                        placeholder="Deck Name"
                        onChange={(e) => setSelectedDeck({ ...selectedDeck, name: e.target.value })}
                        className="rounded-r-none"
                    />
                    <div className="space-x-2 flex justify-center">
                        <Button onClick={() => {
                            if (selectedDeck.deckId === "") {
                                createDeck();
                            } else {
                                updateDeck();
                            }
                            handleModalClose();
                        }}>
                            {selectedDeck.deckId === "" ? 'Create' : 'Update'}
                        </Button>
                        <Button onClick={handleModalClose}>Close</Button>
                    </div>
                </div>
            </Modal>

            {/* 削除モーダル */}
            <Modal isOpen={isDeletedModalOpen} onClose={handleModalClose}>
                <div className=" bg-white m-2 p-4 rounded shadow-md space-y-2">
                    <p className="text-center font-bold">Are you sure you want to permanently delete this deck?</p>
                    <div className="space-x-2 flex justify-center">
                        <Button onClick={() => {
                            deleteDeck();
                            handleModalClose();
                        }}>Done</Button>
                        <Button onClick={handleModalClose}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
