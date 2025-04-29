package com.example.ankilike.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ankilike.domain.Deck;
import com.example.ankilike.dto.DeckDTO;
import com.example.ankilike.repository.CardRepository;
import com.example.ankilike.repository.DeckRepository;

@Service
public class DeckService {

    public enum DeckStatus {
        NEW("NEW"), LEARNING("LEARNING"), REVIEW("REVIEW");

        private DeckStatus(String status) {
            this.status = status;
        }

        private String status;
    }

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
        List<Deck> decks = deckRepository.findAll();
        List<DeckDTO> deckDTOs = new ArrayList<>();

        for (Deck deck : decks) {
            String deckId = deck.getDeckId();
            long totalCount = cardRepository.countByDeckId(deckId);
            long newCount = 0;
            long learningCount = 0;
            long reviewCount = 0;

            List<Object[]> results = cardRepository.countCardsByStatus(deckId);
            for (Object[] row : results) {
                String status = (String) row[0];
                Long count = (Long) row[1];
                if (DeckStatus.NEW.name().equals(status)) {
                    newCount = count;
                } else if (DeckStatus.LEARNING.name().equals(status)) {
                    learningCount = count;
                } else if (DeckStatus.REVIEW.name().equals(status)) {
                    reviewCount = count;
                }
            }

            DeckDTO dto = new DeckDTO(deckId, deck.getName(), totalCount, newCount,
                    learningCount, reviewCount);
            deckDTOs.add(dto);
        }

        return deckDTOs;
    }

}
