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

.title {
  font-size: 2rem;
  font-weight: bold;
  @include break('md') {
    margin: 0;
  }
}

.subtitle {
  font-style: italic;
  font-size: 1.5rem;
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

}

.shadow {
  box-shadow: inset 0 -6px 0 rgba(170, 78, 255, 0.2);
}

</style>
