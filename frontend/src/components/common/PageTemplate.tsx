import React from 'react';
import { Link } from 'react-router-dom';

interface PageTemplateProps {
    children: React.ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ children }) => {
    return (
        <div className="bg-gray-100 min-h-dvh md:min-h-screen flex items-center flex-col ">
            <div className="w-full md:w-1/3 bg-white flex flex-col justify-between flex-grow">
                <header className="bg-green-600 px-2 py-1 text-gray-100 font-bold text-sm">
                    <div className="flex flex-row items-end h-full">
                        <Link to="/decks" className="text-xl font-bold">AnkiLike</Link>
                    </div>
                </header>

                <main className="relative flex-grow px-4 py-6">
                    {children}
                </main>
                <footer className="bg-gray-200 text-gray-700 py-2">
                    <div className="px-4 text-center">
                        <p className="text-sm">&copy; 2025 My App. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default PageTemplate;
