import { suitColorfuls, cardName } from './enum.js';

export class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.colorful = suitColorfuls[suit];
        this.name = cardName[rank];
    }

    toString() {
        return `${suitColorfuls[this.suit]}${cardName[this.rank]}`;
    }
    compareTo(other) {
        return this.rank - other.rank;
    }
}
