<template lang="pug">
  .hero
    .grid
      .grid__item.grid__item--xs-span-2.hidden-md-up
      .grid__item.grid__item--xs-span-8
        | some centered
      .grid__item.grid__item--xs-span-2
</template>

<script>
export default {
}
</script>

<style lang="scss" src="@/assets/style/common.scss"> </style>

<style lang="scss">
$color--hero-bg-dark: #07102c;

.hero {
  background-color: $color--hero-bg-dark;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 90vh;
}
</style>
