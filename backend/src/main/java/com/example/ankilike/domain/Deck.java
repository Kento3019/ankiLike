package com.example.ankilike.domain;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;

@Entity
public class Deck {
    @Id
    private String deckId;
    private String name;

    public Deck() {
        // Default constructor for JPA
    }

    // Constructor
    public Deck(String name) {
        this.deckId = "DECK_" + UUID.randomUUID();
        this.name = name;
    }

    public String getDeckId() {
        return deckId;
    }

    public String getName() {
        return name;
    }
}
