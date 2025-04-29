package com.example.ankilike.dto;

import com.example.ankilike.domain.Card;

public class CardDTO {
    private String cardId;
    private String deckId;
    private String typeCd;
    private String front;
    private String back;
    private String statusCd;

    // Constructor
    public CardDTO(String cardId, String deckId, String typeCd, String front, String back,
            String statusCd) {
        this.cardId = cardId;
        this.deckId = deckId;
        this.typeCd = typeCd;
        this.front = front;
        this.back = back;
        this.statusCd = statusCd;
    }

    // Getters and Setters
    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public String getDeckId() {
        return deckId;
    }

    public void setDeckId(String deckId) {
        this.deckId = deckId;
    }

    public String getTypeCd() {
        return typeCd;
    }

    public void setTypeCd(String typeCd) {
        this.typeCd = typeCd;
    }

    public String getFront() {
        return front;
    }

    public void setFront(String front) {
        this.front = front;
    }

    public String getBack() {
        return back;
    }

    public void setBack(String back) {
        this.back = back;
    }

    public String getStatusCd() {
        return statusCd;
    }

    public void setStatusCd(String statusCd) {
        this.statusCd = statusCd;
    }

    public Card toDomain() {
        // Convert DTO to Domain object
        Card card = new Card(deckId, typeCd, front, back, statusCd);
        return card;
    }
}
