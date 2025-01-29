import { Card } from './Card.js';

export class Deck {
    constructor() {
        this.cards = [];
        this.reset();
    }

    reset() {
        this.cards = [];
        const suits = ['spade', 'heart', 'diamond', 'club'];
        for (let suit of suits) {
            for (let rank = 2; rank <= 14; rank++) {
                this.cards.push(new Card(suit, rank));
            }
        }
        this.shuffle();
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw() {
        return this.cards.pop();
    }
    getTotal() {
        return this.cards.length;
    }

    removeCards(cardsToRemove) {
        this.cards = this.cards.filter(card => 
            !cardsToRemove.some(removeCard => 
                removeCard.suit === card.suit && removeCard.rank === card.rank
            )
        );
    }
}
