<template lang="pug">
  flash-message(transitionName="flash"  class="info flashpool")
</template>

<script>
import Vue from 'vue'
import VueFlashMessage from 'vue-flash-message/dist/vue-flash-message.min.js'
import 'vue-flash-message/dist/vue-flash-message.min.css'
Vue.use(VueFlashMessage)

export default {}
</script>

<style lang="scss">

.flashpool {
  z-index: 12;
  position:fixed;
  display:flex;
  top:6.125rem;
  right:20px;
  max-height:400px;
  width:260px;
  font-size:1.0rem;
  font-family: $FONT-FACE-BASIC;
  perspective:400px;
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
