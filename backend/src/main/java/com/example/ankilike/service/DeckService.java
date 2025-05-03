package com.example.ankilike.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ankilike.domain.deck.Deck;
import com.example.ankilike.dto.DeckDTO;
import com.example.ankilike.repository.CardRepository;
import com.example.ankilike.repository.DeckRepository;

@Service
public class DeckService {

    @Autowired
    private DeckRepository deckRepository;
    @Autowired
    private CardRepository cardRepository;

    public void createDeck(String deckname) {
        // DTO to Domain conversion logic
        Deck deck = new Deck(deckname);
        deckRepository.save(deck);
    }

    public List<DeckDTO> listDecks() {
        List<DeckDTO> deckDTOs = new ArrayList<>();

        List<Deck> decks = deckRepository.findAll();

        deckDTOs = decks.stream().map(d -> {
            return new Deck(
                    d.getDeckId(),
                    d.getName(),
                    cardRepository.findByDeckId(d.getDeckId())).toDTO();
        }).toList();

        return deckDTOs;
    }

    public void updateDeck(DeckDTO deck) {
        // Update logic here (if needed)
        // For now, just a placeholder
        Deck existingDeck = deckRepository.findByDeckId(deck.getDeckId());

        existingDeck.updateFromDTO(deck); // domainメソッドで更新
        deckRepository.save(existingDeck); // Save the updated deck
    }

    public void deleteDeck(String deckId) {
        deckRepository.deleteByDeckId(deckId);
    }

}
