package com.example.ankilike.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ankilike.domain.card.Card;

@Repository
public interface CardRepository extends JpaRepository<Card, String> {

    // デッキIDでカード一覧取得
    List<Card> findByDeckId(String deckId);

    // 特定のデッキ内の復習対象カード
    List<Card> findByDeckIdAndNextStudyDateBefore(String deckId, LocalDateTime now);

    // 特定デッキ内のカード総数を取得
    long countByDeckId(String deckId);
}
