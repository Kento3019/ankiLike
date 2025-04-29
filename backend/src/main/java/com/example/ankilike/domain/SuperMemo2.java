package com.example.ankilike.domain;

public class SuperMemo2 {

    public enum Assessment {
        AGAIN(0),
        HARD(3),
        GOOD(4),
        EASY(5);

        private final int quality;

        Assessment(int quality) {
            this.quality = quality;
        }

        public int getQuality() {
            return quality;
        }

        public static Assessment from(String result) {
            try {
                return Assessment.valueOf(result.toUpperCase());
            } catch (IllegalArgumentException | NullPointerException e) {
                throw new RuntimeException("Invalid assessment result: " + result);
            }
        }
    }

    public enum Status {
        NEW, LEARNING, TO_REVIEW
    }

    public static class ReviewResult {
        public final int nextIntervalMinutes;
        public final int nextRepetition;
        public final double nextEaseFactor;
        public final Status status;

        public ReviewResult(int nextIntervalMinutes, int nextRepetition, double nextEaseFactor, Status status) {
            this.nextIntervalMinutes = nextIntervalMinutes;
            this.nextRepetition = nextRepetition;
            this.nextEaseFactor = nextEaseFactor;
            this.status = status;
        }
    }

    public ReviewResult calculateNext(int currentIntervalMinutes, int currentRepetition, double easeFactor,
            Assessment assessment) {
        int quality = assessment.getQuality();
        int newRepetition;
        double newEaseFactor = easeFactor;
        int newIntervalMinutes;
        Status status;

        if (quality < 3) {
            newRepetition = 0;
            newIntervalMinutes = 0;
            status = Status.LEARNING;
        } else {
            newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
            if (newEaseFactor < 1.3)
                newEaseFactor = 1.3;

            newRepetition = currentRepetition + 1;

            if (newRepetition == 1) {
                newIntervalMinutes = quality == 3 ? 10 : 60; // Hard:10分、Good:60分
            } else if (newRepetition == 2) {
                newIntervalMinutes = 1440; // 1日後
            } else {
                newIntervalMinutes = (int) Math.round(currentIntervalMinutes * newEaseFactor);
            }

            // ステータス判定
            if (newRepetition >= 3) {
                status = Status.TO_REVIEW;
            } else {
                status = Status.LEARNING;
            }
        }

        return new ReviewResult(newIntervalMinutes, newRepetition, newEaseFactor, status);
    }
}
