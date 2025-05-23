package com.example.ankilike.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ankilike.domain.card.Card;
import com.example.ankilike.dto.CardAssessmentDTO;
import com.example.ankilike.dto.CardDTO;
import com.example.ankilike.repository.CardRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    public void createCard(CardDTO cardDTO) {
        // DTO to Domain conversion logic
        Card card = cardDTO.toDomain();

        cardRepository.save(card);
    }

    public void deleteCard() {
        // Logic to delete a card
    }

    public void updateCard(CardDTO cardDTO) {
        Card existingCard = cardRepository.findById(cardDTO.getCardId())
                .orElseThrow(() -> new EntityNotFoundException("Card not found"));

        existingCard.updateFromDTO(cardDTO); // domainメソッドで更新
        cardRepository.save(existingCard);
    }

    public List<CardDTO> listCards(String deckId) {
        List<Card> cards = cardRepository.findByDeckId(deckId);
        return cards.stream().map(e -> e.toDTO()).toList();
    }

    public List<CardDTO> listQuizCards(String deckId) {
        List<Card> quizCards = cardRepository.findByDeckIdAndNextStudyDateBefore(deckId, LocalDateTime.now());
        return quizCards.stream().map(e -> e.toDTO()).toList();
    }

    public void quizResult(CardAssessmentDTO cardAssessmentDTO) {
        Card card = cardRepository.findById(cardAssessmentDTO.getCardId()).orElse(null);
        card.review(cardAssessmentDTO.getResult());
        cardRepository.save(card);
    }
}
