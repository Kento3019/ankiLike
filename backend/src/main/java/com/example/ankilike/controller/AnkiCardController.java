package com.example.ankilike.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.ankilike.dto.CardAssessmentDTO;
import com.example.ankilike.dto.CardDTO;
import com.example.ankilike.service.CardService;

@RestController
@RequestMapping("/api/card")
public class AnkiCardController {

    @Autowired
    private CardService cardService;

    @GetMapping("/list")
    @CrossOrigin(origins = "*")
    public List<CardDTO> listCards(@RequestParam String deckId) {
        List<CardDTO> cards = cardService.listCards(deckId);

        return cards;
    }

    @GetMapping("/Quizlist")
    @CrossOrigin(origins = "*")
    public List<CardDTO> listQuizCards(@RequestParam String deckId) {
        List<CardDTO> quizCards = cardService.listQuizCards(deckId);

        return quizCards;
    }

    @PostMapping("/QuizResult")
    @CrossOrigin(origins = "*")
    public void quizResult(@RequestBody CardAssessmentDTO cardAssessmentDTO) {

        System.out.println("Card ID: " + cardAssessmentDTO.getCardId());
        System.out.println("Result: " + cardAssessmentDTO.getResult());

        cardService.quizResult(cardAssessmentDTO);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    @CrossOrigin(origins = "*")
    public void createCard(@RequestBody CardDTO card) {
        // Logic to create a new card
        cardService.createCard(card);
    }

    @PostMapping("/delete")
    public void deleteCard() {
    }

    @GetMapping("/update")
    public void updateCard() {
    }

}
