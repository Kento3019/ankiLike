package com.example.ankilike.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.ankilike.domain.deck.Deck;

@Repository
public interface DeckRepository extends JpaRepository<Deck, String> {

    // デッキIDでカード一覧取得
    Deck findByDeckId(String deckId);

    @Transactional
    void deleteByDeckId(String deckId); // Custom method to delete by deckId
}
