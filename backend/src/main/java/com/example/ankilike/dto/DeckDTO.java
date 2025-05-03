package com.example.ankilike.dto;

import com.example.ankilike.domain.deck.Deck;

public class DeckDTO {
    private String deckId;
    private String name;
    private long cardCount;
    private long newCount;
    private long learningCount;
    private long reviewCount;

    // Constructor
    public DeckDTO(String deckId, String name, long cardCount, long newCount, long learningCount, long reviewCount) {
        this.deckId = deckId;
        this.name = name;
        this.cardCount = cardCount;
        this.newCount = newCount;
        this.learningCount = learningCount;
        this.reviewCount = reviewCount;
    }

    public String getDeckId() {
        return deckId;
    }

    public String getName() {
        return name;
    }

    public long getCardCount() {
        return cardCount;
    }

    public long getNewCount() {
        return newCount;
    }

    public long getLearningCount() {
        return learningCount;
    }

    public long getReviewCount() {
        return reviewCount;
    }

    public void setDeckId(String deckId) {
        this.deckId = deckId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCardCount(long cardCount) {
        this.cardCount = cardCount;
    }

    public void setNewCount(long newCount) {
        this.newCount = newCount;
    }

    public void setLearningCount(long learningCount) {
        this.learningCount = learningCount;
    }

    public void setReviewCount(long reviewCount) {
        this.reviewCount = reviewCount;
    }

    public Deck toDomain() {
        return new Deck(this.name);
    }

}
