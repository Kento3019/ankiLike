import React from 'react';
import { useSearch } from '../hooks/useSearch'; // カスタムフックを読み込み
import { useSpeak } from '../hooks/useSpeak';
import SpeakerIcon from '../components/UI/icon/SpeakerIcon';

const Search: React.FC = () => {
    const { cards } = useSearch();
    const { speak } = useSpeak();

    return (
        <div className="max-w-3xl mx-auto ">
            {cards.length > 0 ? (
                <div className="overflow-x-auto bg-white shadow-md">
                    <table className="min-w-full divide-y divide-green-600">
                        <thead className="bg-green-600 text-white">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-semibold ">Front</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold ">Back</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-green-100">
                            {cards.map((card) => (
                                <tr key={card.cardId} className="hover:bg-green-50 transition">
                                    <td className="px-4 py-2 text-sm text-gray-800">
                                        <div className="flex justify-between items-center p-2 bg-white">
                                            <div>
                                                {card.front}
                                            </div>
                                            <button
                                                className="pr-2 cursor-pointer"
                                                onClick={() => speak(card.front)}
                                            >
                                                <SpeakerIcon className="" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{card.back}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600">No cards found.</p>
            )}
        </div>
    );

};

export default Search;
