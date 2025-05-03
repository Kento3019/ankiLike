package com.example.ankilike.domain.card;

import java.time.LocalDateTime;
import java.util.UUID;

import com.example.ankilike.domain.algorithm.SuperMemo2;
import com.example.ankilike.domain.algorithm.SuperMemo2.Assessment;
import com.example.ankilike.domain.algorithm.SuperMemo2.ReviewResult;
import com.example.ankilike.dto.CardDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Card {
    private final static String CARD_ID_PREFIX = "CARD_";

    @Id
    private String cardId;
    private String deckId;
    private String typeCd;
    private String front;
    private String back;
    private String statusCd;
    private LocalDateTime lastStudiedDate;
    private LocalDateTime nextStudyDate;

    // SuperMemo-2用のパラメータ
    private int studyInterval; // 次回までの日数（初期値：0）
    private int repetition; // 成功連続回数（初期値：0）
    private double easeFactor; // 難易度係数（初期値：2.5）

    public Card() {
        // Default constructor for JPA
    }

    // Constructor
    public Card(String deckId, String typeCd, String front, String back, String statusCd) {
        this.cardId = CARD_ID_PREFIX + UUID.randomUUID().toString();
        this.deckId = deckId;
        this.typeCd = typeCd;
        this.front = front;
        this.back = back;
        this.statusCd = statusCd;
        this.nextStudyDate = LocalDateTime.now();
        this.lastStudiedDate = LocalDateTime.now();

        this.studyInterval = 0; // 初期値
        this.repetition = 0; // 初期値
        this.easeFactor = 2.5; // 初期値
    }

    public void review(String asessmentString) {
        Assessment assessment = Assessment.from(asessmentString);
        SuperMemo2 sm2 = new SuperMemo2();

        ReviewResult result = sm2.calculateNext(
                this.studyInterval,
                this.repetition,
                this.easeFactor,
                assessment);

        this.studyInterval = result.nextIntervalMinutes;
        this.repetition = result.nextRepetition;
        this.easeFactor = result.nextEaseFactor;
        this.statusCd = result.status.name();

        this.lastStudiedDate = LocalDateTime.now();
        this.nextStudyDate = this.lastStudiedDate.plusMinutes(this.studyInterval);
    }

    public void updateFromDTO(CardDTO dto) {
        if (dto.getDeckId() != null)
            this.deckId = dto.getDeckId();
        if (dto.getTypeCd() != null)
            this.typeCd = dto.getTypeCd();
        if (dto.getFront() != null)
            this.front = dto.getFront();
        if (dto.getBack() != null)
            this.back = dto.getBack();
        if (dto.getStatusCd() != null)
            this.statusCd = dto.getStatusCd();
    }

    public CardDTO toDTO() {
        return new CardDTO(cardId, deckId, typeCd, front, back, statusCd);
    }

    public String getStatusCd() {
        return statusCd;
    }
}
