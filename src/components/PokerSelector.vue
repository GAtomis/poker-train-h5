<template>
  <div class="poker-selector" >
    <div class="popup">
      <div class="title">花色</div>
      <div class="suits">
        <div
          v-for="[suit, colorful] of suits"
          :key="suit+colorful"
          class="suit"
          :class="suit"
          @click="selectSuit([suit, colorful])"
        >
          {{ colorful }}
        </div>
      </div>
      <div class="title">牌堆</div>
      <div class="cards">
        <div
          v-for="card in cards"
          :key="card"
          class="card"
          @click="selectCard(card)"
        >
          <PokerCard :info="card"></PokerCard>
        </div>
      </div>
      <div class="title">手牌区</div>
      <div class="select-hand-cards">
        <div v-for="card,index in handCards" :key="card" class="card" @click="selectIndex=index">
          <PokerCard :info="card"></PokerCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {  defineEmits } from 'vue';
  import { suitColorfuls, cardName } from '@/utils/enum.js';
  import PokerCard from './PokerCard.vue';
  import { ref } from 'vue';
import { computed } from 'vue';
 const props= defineProps({
    deck: {
      type: Array,
      default: () => [],
    }
  });
  const cards= computed(() => {
    return props.deck.filter((item) => item.suit === currentSuit.value).sort((a, b) => a.rank - b.rank);
  });
  



  const emit = defineEmits(['update:visible', 'select']);


  const suits = ref(Object.entries(suitColorfuls));

  const handCards = ref([]);

  const currentSuit = ref('spade');
  const selectSuit = ([suit,colorful] ) => {
    // console.log(item);

    currentSuit.value = suit;
    cards.value.forEach((item) => {
      item.suit = suit;
      item.colorful = colorful;
    });
  };

  const close = () => {
    emit('update:visible', false);
  };
  // 当前选择索引
  let selectIndex = null;
  //牌是否相等
  const isEquel = (card1, card2) => {
    return card1.rank === card2.rank && card1.suit === card2.suit;
  };

  const selectCard = (card) => {
    //牌是否相等
    handCards.value.some((item, index) => {
      if (isEquel(item, card)) {
        handCards.value.splice(index, 1);
        selectIndex = null;
        return true;
      }
    });
    card=JSON.parse(JSON.stringify(card));  
    if (handCards.value.length < 2 && selectIndex === null) {
      handCards.value.push(card);
    } else {
      if (selectIndex === null) {
        selectIndex = handCards.value.length - 1;
      }
      handCards.value[selectIndex] = card;
    }
  
    // emit('select', card);
    // close();
  };

  defineExpose({
    handCards,
  });

  
</script>

<style scoped>
  .poker-selector {
    /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .overlay {
    /* position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); */
  }

  .popup {
    position: relative;
    background: white;
    border-radius: 10px;
    padding: 20px;
    width: 80%;
    max-width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    /* margin-top: 20px; */
  }

  .card {
    width: 48px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 10px; */
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }
  .suits {
    display: flex;
  }
  .suit {
    font-size: 36px;

    &.spade {
      color: black;
    }
    &.heart {
      color: red;
    }
    &.diamond {
      color: red;
    }
    &.club {
      color: black;
    }
  }

  .card:hover {
    background: #f0f0f0;
  }
  .select-hand-cards {
    display: flex;
    gap: 10px;
  }
  .title{
    margin: 10px 0;

  }
</style>
