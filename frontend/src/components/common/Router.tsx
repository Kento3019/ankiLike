import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Add from '../../pages/Add';
import { Study } from '../../pages/Study';
import Search from '../../pages/Search';
import Header from './Header';
import { Decks } from '../../pages/Decks';

export const Router = () => {
    return (
        <Routes>
            <Route path="/decks" element={
                <>
                    <Header />
                    <Decks />
                </>
            } />
            <Route path="/add/:deckId" element={
                <>
                    <Header />
                    <Add />
                </>
            }
            />
            <Route path="/search/:deckId" element={
                <>
                    <Header />
                    <Search />
                </>
            }
            />
            <Route path="/decks/study/:deckId" element={
                <>
                    <Header />
                    <Study />
                </>
            } />
        </Routes>
    );
}
