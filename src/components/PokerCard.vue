<template>
  <div class="poker-card" :class="{ 'is-flipped': isFlipped }">
    <div class="poker-card__back">
      <slot name="back">
        <div class="content" v-if="info">
          <span class="content-name" >{{ info.name }}</span>
          <span class="content-suit" :class="info.suit">{{ info.colorful }}</span>
        </div>
        <img :src="backImg" alt=""  v-else>
      </slot>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  defineProps({
    isFlipped: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
      default: null,
    },
  });

  const backImg = ref('/static/poker-card-front.png');
</script>

<style lang="scss" scoped>
  .poker-card {
    border-radius: 2px;
    // overflow: hidden;
    position: relative;
    transition: transform 0.6s;
    transform-style: preserve-3d;

    &.is-flipped {
      transform: rotateY(180deg);
    }

    &__front,
    &__back {
      width: 100%;
      height: 100%;
      position: absolute;
      backface-visibility: hidden;

      img {
        width: 100%;
        height: 100%;
      }
      .content {
        background-color: #fff;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4px;
        
        &-suit {
          font-size: 16px;
        }
        &-name {
          font-family: Roboto;
          font-size: 16px;
          font-weight: normal;
          line-height: 16.5px;
          letter-spacing: 0px;
          color: #000000;
        }
      }
    }

    &__front {
      transform: rotateY(180deg);
    }

    &__back {
      // background-color: #DC143C;
    }
  }
</style>
