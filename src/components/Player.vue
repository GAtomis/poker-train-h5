<template>
  <div class="player">
    <div class="player__info">
      <div class="player__name">{{ player.name }}</div>
      <div class="player__balance">{{ player.chips }}</div>
    </div>
    <div class="player__cards"    @click="chooseCard">
      <PokerCard
        v-for="card in player.holeCards"
        :key="card.id"
        :info="card"
        class="player__card"
      />
      <!-- 初始化手牌 -->
      <PokerCard
        v-if="player.holeCards.length === 0"
     
        class="player__card"></PokerCard>
      <PokerCard
        v-if="player.holeCards.length === 0"
  
        class="player__card"></PokerCard>
    </div>
  </div>
</template>
<script setup>
import PokerCard from './PokerCard.vue';
  const props=defineProps({
    player: {
      type: Object,
      default: () => ({
        name: 'Player 1',
        chips: '1000',
        holeCards: [],
        status: 'ACTIVE',
        currentBet: 0,
        seatId: 1,
        isDealer: true,
      }),
    },
  });
  const emits = defineEmits(['chooseCard']);
  const chooseCard = () => {
    emits('chooseCard', props.player);
  };
</script>
<style lang="scss" scoped>
  .player {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    &__info {
      display: flex;
      gap: 1rem;
      color: #fff;
    }

    &__name {
      font-size: 1.5rem;
    }

    &__balance {
      font-size: 1.5rem;
    }

    &__cards {
      display: flex;
      gap: 1rem;

    }
    &__card {
      width: 48 * 0.7px;
      height: 64 * 0.7px;
    }
  }
</style>
