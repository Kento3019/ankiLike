import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Update from '../../pages/Update';
import { Study } from '../../pages/Study';
import Search from '../../pages/Search';
import { Decks } from '../../pages/Decks';
import PageTemplate from './PageTemplate';
import { DeckProvider } from '../../context/DeckProvider';
import { CardProvider } from '../../context/CardProvider';

export const Router = () => {
    return (
        <PageTemplate>
            <DeckProvider>
                <CardProvider>
                    <Routes>
                        <Route path="/decks" element={
                            <>

                                <Decks />
                            </>
                        } />
                        <Route path="/update/" element={
                            <>
                                <Update />
                            </>
                        }
                        />
                        <Route path="/search/" element={
                            <>

                                <Search />
                            </>
                        }
                        />
                        <Route path="/decks/study/" element={
                            <>

                                <Study />
                            </>
                        } />
                    </Routes>
                </CardProvider>
            </DeckProvider >
        </PageTemplate >
    );
}
