<template lang="pug">
  div#app.app(vue-app-mounted-here)
    router-view
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">

@font-face {
  font-family: 'Play';
  font-style: normal;
  font-weight: 400;
  src: url('./assets/fonts/Play.woff') format('woff');
}

@include scrollbars(.6rem, #627891, transparent);

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
}

div[data-popover] {
  background: $HERO-BK-COLOR;
  color: $NAV-ITEM-COLOR;
  font: normal .9em 'Play';
  line-height: 1.5;
  margin: 5px;
  &.dropdown-position-bottom:before {
    border-bottom: 6px solid $HERO-BK-COLOR;
  }
  &.dropdown-position-top:before {
    border-top: 6px solid $HERO-BK-COLOR;
  }
}

.popover-enter-active, .popover-leave-active {
  transition: opacity .5s;
}
.popover-enter, .popover-leave-to {
  opacity: 0;
}

</style>
