<template lang="pug">
  div#app(vue-app-mounted-here)
    router-view
    Flash
</template>

<script>
import Flash from './components/common/flash'

export default {
  name: 'App',
  components: {
    Flash
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'Proxima Nova';
  src: url('./assets/fonts/ProximaNova-Regular.woff') format('woff'); 
}

@font-face {
  font-family: 'Play';
  src: url('./assets/fonts/Play.woff') format('woff');
}

@include scrollbars(.6rem, #627891, transparent);

</style>
