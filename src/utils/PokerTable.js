import { GAME_ROUNDS } from './enum.js';
import { Deck } from './Deck.js';

export class PokerTable {
  constructor(maxPlayers = 9) {
    this.maxPlayers = maxPlayers;
    this.players = [];
    this.deck = new Deck();
    this.communityCards = [];
    this.pot = 0;
    this.currentRound = GAME_ROUNDS.PREFLOP;
    this.button = 0;
    this.setSeat(maxPlayers-1)
  }

  setSeat(num) {   
    this.seats=Array.from({
        length: num
    },(_,index)=>({
        name:`${index+1}号位`,
        id:index+1,
        className:`seat${index+1}`,
        player:null
    }))
  }

  addPlayer(player) {
    if (this.players.length >= this.maxPlayers) return false;
    if (player.seatId ) {

        if(this.seats[player.seatId-1].player){
            return false
        }
        this.seats[player.seatId-1].player=player
    }
    if (this.players.length === 0) {
      player.isDealer = true;
    }
    this.players.push(player);
    
    return true;
  }
  removeSeat(id){
    this.seats[id-1].player=null
  }
  startHand() {
    this.deck.reset();
    this.dealHoleCards();
    this.currentRound = GAME_ROUNDS.PREFLOP;
  }
  dealHoleCards() {
    for (let i = 0; i < 2; i++) {
      this.players.forEach((player) => {
        if (player.status === 'ACTIVE') {
          player.receiveCard(this.deck.draw());
        }
      });
    }
  }

  dealCommunityCards() {
    switch (this.currentRound) {
      case GAME_ROUNDS.FLOP:
        for (let i = 0; i < 3; i++) {
          this.communityCards.push(this.deck.draw());
        }
        break;
      case GAME_ROUNDS.TURN:
      case GAME_ROUNDS.RIVER:
        this.communityCards.push(this.deck.draw());
        break;
    }
  }
  getAllSeatPlayerHandCards(){
    return this.seats.map(seat=>seat.player?seat.player.getHand():[]).filter(cards=>cards.length>0).flat()     
  }
  progressRound() {
    const rounds = Object.values(GAME_ROUNDS);
    const currentIndex = rounds.indexOf(this.currentRound);
    if (currentIndex < rounds.length - 1) {
      this.currentRound = rounds[currentIndex + 1];
      this.dealCommunityCards();
      return true;
    }
    return false;
  }

  findPlayerByUUID(uuid) {
    // 在座位中查找玩家
    const seat = this.seats.find(seat => seat.player && seat.player.uuid === uuid);
    return seat ? seat.player : null;
  }
}
