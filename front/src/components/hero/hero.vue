<template lang="pug">
  .hero
</template>

<script>
export default {
}
</script>

<style lang="scss">

$color--hero-bg: #316c7a;

.hero {
  background-color: $color--hero-bg;
  // position: absolute;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(circle at 25%, rgba(lighten($color--hero-bg, 5%), .8) 10%, rgba($color--hero-bg, 0));
    z-index: 3;
  }  
}


</style>
