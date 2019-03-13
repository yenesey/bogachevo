<template lang="pug">
  .tooltip
</template>

<script>
export default {

}
</script>

<style lang="scss">

.tooltup {
  z-index: 12;
  position: absolute;
  display: flex;
  width: 260px;
  font-size: 1.0rem;
  font-family: $FONT-FACE-BASIC;

  &:before {
    top: -20px;
    left: 25%;
    border: 10px solid transparent;
    border-bottom: 10px solid #2a2c39;
  }
}

.flash__message.info {
  background: $HERO-BK-COLOR;
  color: $NAV-ITEM-COLOR;
  border: none; 
  @include transition(all .5s);
}

.flash-enter,.flash-leave-to {
  opacity:0;
  @include transform(rotateX(-30deg) scale(.88) translateY(-30px));
}  
.flash-leave-active {
  position: absolute;
}
</style>
