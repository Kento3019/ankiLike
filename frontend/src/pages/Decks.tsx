import { useDecks } from "../hooks/useDecks";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { Modal } from "../components/UI/Modal";
import KebabMenu from "../components/UI/KebabMenu";
import { useFAB } from "../hooks/useFAB";
import { FAB } from "../components/UI/FAB";
import { NoteIcon } from "../components/UI/icon/NoteIcon";

export const Decks = () => {
    const {
        decks,
        selectedDeck,
        isCreateEditModalOpen,
        isDeleteModalOpen,
        deleteDeck,
        handleCloseModals,
        handleSubmitDeck,
        handleDeckAction,
        handleNavigation,
        setSelectedDeck,
        setCreateEditModalOpen,
    } = useDecks();
    const { isOpenFAB, toggleFAB } = useFAB();

    return (
        <div className="decks-container">
            <table className="w-full table-fixed mb-1">
                <tbody>
                    {decks.map((deck) => (
                        <tr className="bg-gray-100 border-b border-white" key={deck.deckId}>
                            <td className="px-2 py-1">
                                <button
                                    className="font-bold text-left w-full"
                                    onClick={() => handleNavigation("/decks/study/", deck)}
                                >
                                    {deck.name}
                                </button>
                                <div className="space-x-1 text-sm">
                                    <span className="text-gray-700">Count:{deck.cardCount}</span>
                                    <span className="text-blue-500">New:{deck.newCount}</span>
                                    <span className="text-green-500">Learning:{deck.learningCount}</span>
                                    <span className="text-pink-500">Review:{deck.reviewCount}</span>
                                </div>
                            </td>
                            <td className="px-2 py-2 text-right">
                                <KebabMenu
                                    items={[
                                        {
                                            label: "Add",
                                            onClick: () => handleNavigation("/cardForm/", deck, true),
                                        },
                                        {
                                            label: "Edit",
                                            onClick: () => handleDeckAction("edit", deck),
                                        },
                                        {
                                            label: "Delete",
                                            onClick: () => handleDeckAction("delete", deck),
                                        },
                                        {
                                            label: "Search",
                                            onClick: () => handleNavigation("/search/", deck),
                                        },
                                    ]}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <FAB isOpenFAB={isOpenFAB} onClose={toggleFAB}>
                <div className="flex flex-col">
                    <Button
                        className="rounded-full px-4 py-3 bg-green-600 text-white shadow-md hover:bg-green-500 active:bg-green-400 transition-all duration-200 ease-in-out"
                        onClick={() => {
                            setCreateEditModalOpen(true);
                            toggleFAB();
                        }}
                    >
                        <span className="flex items-center">
                            <NoteIcon className="mr-2" /> Create Deck
                        </span>
                    </Button>
                </div>
            </FAB>

            {/* Create/Edit Modal */}
            <Modal isOpen={isCreateEditModalOpen} onClose={handleCloseModals}>
                <div className="bg-white m-2 p-4 rounded shadow-md space-y-2">
                    <Input
                        type="text"
                        value={selectedDeck.name}
                        placeholder="Deck Name"
                        onChange={(e) => setSelectedDeck({ ...selectedDeck, name: e.target.value })}
                        className="rounded-r-none"
                    />
                    <div className="space-x-2 flex justify-center">
                        <Button onClick={handleSubmitDeck}>
                            {selectedDeck.deckId === "" ? "Create" : "Update"}
                        </Button>
                        <Button onClick={handleCloseModals}>Close</Button>
                    </div>
                </div>
            </Modal>

            {/* Delete Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={handleCloseModals}>
                <div className="bg-white m-2 p-4 rounded shadow-md space-y-2">
                    <p className="text-center font-bold">
                        Are you sure you want to permanently delete this deck?
                    </p>
                    <div className="space-x-2 flex justify-center">
                        <Button
                            onClick={() => {
                                deleteDeck();
                                handleCloseModals();
                            }}
                        >
                            Done
                        </Button>
                        <Button onClick={handleCloseModals}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
