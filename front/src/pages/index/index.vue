<template lang="pug">
  .index
    Hero
    Works
    About
    Contacts
    Footer
</template>

<script>
import Hero from './hero'
import Works from './works'
import About from './about'
import Contacts from './contacts'
import Footer from '@/components/common/footer'

export default {
  components: {
    Hero,
    About,
    Works,
    Contacts,
    Footer
  }
}
</script>

<style lang="scss">
h1, h2, a, span {
  font-family: $FONT-FACE-BASIC;
}

.title {
  // font-size: 2rem;
  font-weight: bold;
}

.subtitle {
  font-style: italic;
 // font-size: 1.5rem;
  font-weight: 300;
}

.heading {
  font-size: 1.3rem;
  line-height: 2.5rem;
}

.subheading {
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.5;
  @include break('md') {
    margin: auto;
  }
}

.shadow {
  box-shadow: inset 0 -6px 0 $HIGHLIGHT-ITEM-COLOR;
}

</style>
