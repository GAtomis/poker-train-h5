<template>
  <div class="home">
    <div class="bg">
      <div class="public-area">
 
      </div>
      <div
        class="player"
        v-for="seat in table.seats"
        :key="seat.id"
        :class="'seat-' + seat.id"
      >
        <PlayerArea v-if="seat.player" :player="seat.player" @choose-card="addCard"></PlayerArea>
        <van-icon v-else size="32" name="plus" @click="addPlayer(seat)" />
      </div>
    </div>
    <div class="control">
      <van-button type="primary" @click="runReport">运行报告</van-button>
    </div>
    <!-- 增加一名玩家 -->
    <van-dialog v-model:show="showPlayerDialog" title="添加一名玩家" show-cancel-button @confirm="confirmAddPlayer">
      <van-form ref="form" :model="newPlayer">
        <van-cell-group inset>
          <van-field
            v-model="newPlayer.name"
            name="玩家名称"
            label="玩家名称"
            placeholder="玩家名称"
            :rules="[{ required: true, message: '请填写玩家名称' }]"
          />
          <van-field
            v-model="newPlayer.chips"
            type="number"
            name="带入筹码"
            label="带入筹码"
            placeholder="带入筹码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
 
      </van-form>
    </van-dialog>
    <!-- 增加玩家手牌 -->
     <van-dialog v-model:show="showHandDialog" title="选择手牌" show-cancel-button @confirm="confirmAddHandCard">
           <PokerSelector :deck="table.deck.cards"  ref="pokerSelector" ></PokerSelector>
     </van-dialog>
   

  </div>
</template>

<script setup>
  import { ref } from 'vue';
  const isShow = ref(false);
  import PokerCard from '../../components/PokerCard.vue';
  import { Player } from '../../utils/Player.js';
  import { PokerTable } from '@/utils/PokerTable.js';
  import { reactive } from 'vue';
  import PlayerArea from '../../components/Player.vue';
  import PokerSelector from '../../components/PokerSelector.vue';
  import { simulatePoker } from '@/api/poker';
  const showPlayerDialog = ref(false);
  const showHandDialog = ref(false);
  const newPlayer=ref(null);
  const pokerSelector = ref(null);
  const addPlayer = (seat) => {
    newPlayer.value=new Player('Player '+seat.id, 1000, seat.id);
    showPlayerDialog.value = true;
  };
  const confirmAddPlayer = () => {
    console.log(newPlayer.value);
    table.addPlayer(newPlayer.value);
    showPlayerDialog.value = false;
  };
  let currentPlayer =null
  const addCard = (player) => {
    currentPlayer=player 
    table.correctDecks()
    showHandDialog.value =true
    pokerSelector.value.handCards=JSON.parse(JSON.stringify(player.holeCards))
  };
  const usedCards = ref([]);
  const confirmAddHandCard = () => {
    showHandDialog.value = false;
    const player= table.findPlayerByUUID(currentPlayer.uuid)
    console.warn(player);
    player.setHoleCards(JSON.parse(JSON.stringify(pokerSelector.value.handCards))); 
    table.correctDecks()
  };
  const table = reactive(new PokerTable());
  const initGame = () => {
    // table.addPlayer(player1);
    // table.addPlayer(player2);
    table.startHand();
  };
  initGame();
 const runReport = async () => {
  // 获取所有有手牌的玩家
  const playersWithCards = table.seats
    .filter(seat => seat.player && seat.player.holeCards.length === 2)
    .map(seat => seat.player);

  if (playersWithCards.length === 0) {
    alert('请至少为一名玩家选择手牌');
    return;
  }

  // 将花色映射为中文
  const suitMap = {
    'spade': '黑桃',
    'heart': '红桃',
    'club': '梅花',
    'diamond': '方片'
  };

  const requestData = {
    playernumber: playersWithCards.length,
    handCardList: playersWithCards.map(player => ({
      handCard: player.holeCards.map(card => ({
        suit: suitMap[card.suit] || card.colorful,
        rank: card.rank
      }))
    })),
    roundNumber:10000
  };

  try {
    const res = await simulatePoker(requestData);
    console.log('模拟结果:', res);
  } catch (error) {
    console.error('模拟失败:', error);
  }
};
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
    width: 100%;
    background-color: #2c7a7b;
    .bg {
      height:calc(100% - 55px);
      width: 100%;
      background: url('/static/bg.png') center/cover no-repeat;
      background-size: 99%;
      position: relative;
      .public-area {
        position: absolute;
        top: 208px;
        left: 78px;
        display: flex;
        gap: 8px;
        // transform: translate(-50%, -50%);
        .public-card {
          width: 48 * 0.7px;
          height: 64 * 0.7px;
        }
      }
      .player {
        .pend-add {
          width: 48px;
        }

        &.seat-1 {
          position: absolute;
          top: 240px - 30px; 
          left: 34px + 10px;
        }
        &.seat-2 {
          position: absolute;
          top: 290px+100px - 30px; 
          left: 34px + 10px;
        }
        &.seat-3 {
          position: absolute;
          top: 340px+200px - 30px; ;
          left: 34px + 10px;
        }
        &.seat-4 {
          position: absolute;
          top: 270px+200px * 2 - 10px;
          left: 34px+30px;
        }
        &.seat-5 {
          position: absolute;
          top: 270px+200px * 2 - 10px;
          right: 34px+30px;
        }
        &.seat-6 {
          position: absolute;
          top: 340px+200px - 30px; ;
          right: 34px + 10px;
        }
        &.seat-7 {
          position: absolute;
          top: 240px - 30px; 
          right: 34px + 10px;
        }

        &.seat-8 {
          position: absolute;
          top: 100px - 60px;
          left: 34px+30px;
        }
        &.seat-9 {
          position: absolute;
          top: 100px - 60px;
          right: 34px+30px;
        }
      }
    }
    .control {
      height: 55px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
