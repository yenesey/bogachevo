<template lang="pug">
  .page
    Hero
    Works
</template>

<script>
import Hero from './hero/hero'
import Works from './works/works'
export default {
  components: {
    Hero,
    Works
  }
}
</script>

<style lang="scss">

body {
  margin: 0px;
}

* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

</style>
