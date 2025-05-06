import { Route, Routes } from 'react-router-dom';
import { Study } from '../../pages/Study';
import { CardForm } from '../../pages/CardForm';
import Search from '../../pages/Search';
import { Decks } from '../../pages/Decks';
import PageTemplate from './PageTemplate';
import { CardProvider } from '../../context/Card/CardProvider';
import { DeckProvider } from '../../context/Deck/DeckProvider';
import { AppSettingsProvider } from '../../context/AppSettings/AppSettingProvider';

export const Router = () => {
    return (
        <PageTemplate>
            <DeckProvider>
                <CardProvider>
                    <AppSettingsProvider>
                        <Routes>
                            <Route path="/decks" element={<Decks />} />
                            <Route path="/decks/study/" element={<><Study /></>} />
                            <Route path="/cardForm/" element={<CardForm />} />
                            <Route path="/search/" element={<Search />} />
                        </Routes>
                    </AppSettingsProvider>
                </CardProvider>
            </DeckProvider >
        </PageTemplate >
    );
}
