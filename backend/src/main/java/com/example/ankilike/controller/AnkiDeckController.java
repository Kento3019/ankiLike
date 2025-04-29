package com.example.ankilike.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.example.ankilike.dto.DeckDTO;
import com.example.ankilike.service.DeckService;

//https://daiichi.dev/%EF%BC%92%EF%BC%97%EF%BC%8Espring-boot%E3%81%AB%E3%82%88%E3%82%8Brestful-api%E3%81%AE%E9%96%8B%E7%99%BA%E3%82%AC%E3%82%A4%E3%83%89/

@RestController
@RequestMapping("/api/deck")
public class AnkiDeckController {

    @Autowired
    private DeckService deckService;

    @GetMapping("/list")
    @CrossOrigin(origins = "*")
    public List<DeckDTO> listDecks() {
        // Sample data for demonstration purposes
        List<DeckDTO> decks = deckService.listDecks();
        return decks;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    @CrossOrigin(origins = "*")
    public void createDeck(@RequestBody DeckDTO deck) {
        deckService.createDeck(deck.getName());

    }

    @PostMapping("/delete")
    public void deleteDeck() {
    }

    @GetMapping("/update")
    public void updateDeck() {
    }

}
