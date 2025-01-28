import { PLAYER_STATUS } from './enum.js';

export class Player {
    constructor(name, chips,seatId) {
        this.name = name;
        this.chips = chips;
        this.holeCards = [];
        this.status = PLAYER_STATUS.ACTIVE;
        this.currentBet = 0;
        this.seatId=seatId||null
        this.uuid = crypto.randomUUID(); // 添加唯一标识符
    }
    setHoleCards(cards) {
        this.holeCards = cards;
    }
    receiveCard(card) {
        this.holeCards.push(card);
    }
    bet(amount) {
        if (amount > this.chips) return false;
        this.chips -= amount;
        this.currentBet += amount;
        return amount;
    }

    fold() {
        this.status = PLAYER_STATUS.FOLDED;
        this.holeCards = [];
    }

    getHand() {
        return [...this.holeCards];
    }
}
