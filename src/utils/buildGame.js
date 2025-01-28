import { suitColorfuls, cardName, GAME_ROUNDS, PLAYER_STATUS } from './enum.js';
import { Card } from './Card.js';
import { Deck } from './Deck.js';
import { Player } from './Player.js';
import { PokerTable } from './PokerTable.js';

// 使用示例
const table = new PokerTable();
const player1 = new Player("Player 1", 1000);
const player2 = new Player("Player 2", 1000);

table.addPlayer(player1);
table.addPlayer(player2);
table.startHand();