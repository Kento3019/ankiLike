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

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/card")
public class AnkiCardController {

    @Autowired
    private CardService cardService;

    @GetMapping("/list")
    public List<CardDTO> listCards(@RequestParam String deckId) {
        return cardService.listCards(deckId);
    }

    @GetMapping("/quiz-list")
    public List<CardDTO> listQuizCards(@RequestParam String deckId) {
        return cardService.listQuizCards(deckId);
    }

    @PostMapping("/quiz-result")
    public void quizResult(@RequestBody CardAssessmentDTO cardAssessmentDTO) {
        cardService.quizResult(cardAssessmentDTO);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    public void createCard(@RequestBody CardDTO card) {
        cardService.createCard(card);
    }

    @PostMapping("/delete")
    public void deleteCard(@RequestBody CardDTO card) {
        // cardService.deleteCard(card.getCardId());
    }

    @PostMapping("/update")
    public void updateCard(@RequestBody CardDTO card) {
        cardService.updateCard(card);
    }
}
