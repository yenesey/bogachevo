<template lang="pug">
  .hero
    .grid-row(style="height:48px")
      .item.col-sm-span-8.col-sm-offset-2
        | HELLO WORLD
       
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

// nth paint example
.item {
  // padding: 0.5rem;

  &:nth-child(even) {
    background-color: #eee;
  }
  
  &:nth-child(odd) {
    background-color: #ddd;
  }
}

</style>
