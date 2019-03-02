<template lang="pug">
  .index-page
    Hero
    Works
    Contact
</template>

<script>
import Hero from './hero/hero'
import Works from './works/works'
import Contact from './contact'
export default {
  components: {
    Hero,
    Works,
    Contact
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
