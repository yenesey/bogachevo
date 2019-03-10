<template lang="pug">
  .index-page
    Hero
    Works
    About
    Contact
    Footer
</template>

<script>
import Hero from './hero/hero'
import Works from './works/works'
import About from './about'
import Contact from './contact'
import Footer from './footer'

export default {
  components: {
    Hero,
    About,
    Works,
    Contact,
    Footer
  }
}
</script>

<style lang="scss">
span {
  font-family:Proxima Nova;
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
  font-family: Roboto,sans-serif;
  font-size: 1.3rem;
  line-height: 2.5rem;
}

.subheading {
  font-family: Roboto,sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.5;
  @include break('md') {
    margin: auto;
  }
}

.shadow {
  box-shadow: inset 0 -6px 0 rgba(48, 106, 172, 0.39);
}

</style>
