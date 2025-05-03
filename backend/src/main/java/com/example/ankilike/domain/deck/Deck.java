package com.example.ankilike.domain.deck;

import java.util.List;
import java.util.UUID;

import com.example.ankilike.domain.card.Card;
import com.example.ankilike.dto.CardDTO;
import com.example.ankilike.dto.DeckDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;

@Entity
public class Deck {
    @Id
    private String deckId;
    private String name;

    @Transient
    private long cardCount;
    @Transient
    private long newCount;
    @Transient
    private long learningCount;
    @Transient
    private long reviewCount;

    public Deck() {
        // Default constructor for JPA
    }

    // Constructor
    public Deck(String name) {
        this.deckId = "DECK_" + UUID.randomUUID();
        this.name = name;
    }

    // Constructor
    public Deck(String deckId, String name, List<Card> cards) {
        this.deckId = deckId;
        this.name = name;
        ;
        calculateCardCounts(cards);
    }

    private void calculateCardCounts(List<Card> cards) {
        if (cards == null) {
            this.cardCount = 0;
            this.newCount = 0;
            this.learningCount = 0;
            this.reviewCount = 0;
            return;
        }
        this.cardCount = cards.size();
        this.newCount = cards.stream().filter(card -> card.getStatusCd().equals("NEW")).count();
        this.learningCount = cards.stream().filter(card -> card.getStatusCd().equals("LEARNING")).count();
        this.reviewCount = cards.stream().filter(card -> card.getStatusCd().equals("REVIEW")).count();
    }

    public String getDeckId() {
        return deckId;
    }

    public String getName() {
        return name;
    }

    public DeckDTO toDTO() {
        return new DeckDTO(deckId, name, cardCount, newCount, learningCount, reviewCount);
    }

    public void updateFromDTO(DeckDTO dto) {
        this.name = dto.getName();
    }
}
