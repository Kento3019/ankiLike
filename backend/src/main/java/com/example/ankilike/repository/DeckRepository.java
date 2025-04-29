package com.example.ankilike.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ankilike.domain.Deck;

@Repository
public interface DeckRepository extends JpaRepository<Deck, String> {
}
