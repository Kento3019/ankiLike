package com.example.ankilike.controller;

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

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/deck")
public class AnkiDeckController {

    @Autowired
    private DeckService deckService;

    @GetMapping("/list")
    public List<DeckDTO> listDecks() {
        return deckService.listDecks();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    public void createDeck(@RequestBody DeckDTO deck) {
        deckService.createDeck(deck.getName());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/delete")
    public void deleteDeck(@RequestBody DeckDTO deck) {
        deckService.deleteDeck(deck.getDeckId());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/update")
    public void updateDeck(@RequestBody DeckDTO deck) {
        deckService.updateDeck(deck);
    }
}
