<template lang="pug">
  .index-page
    Hero
    Works
    About
    Contact
</template>

<script>
import Hero from './hero/hero'
import Works from './works/works'
import About from './about'
import Contact from './contact'

export default {
  components: {
    Hero,
    About,
    Works,
    Contact
  }
}
</script>

<style lang="scss">
body {
  margin: 0px;
  -o-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
