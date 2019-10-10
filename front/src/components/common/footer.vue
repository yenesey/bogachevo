<template lang="pug">
  footer
      .flex.row.links
        .flex
          span.p-2 Создано с использованием
        .flex
          a.p-2(href="https://nodejs.org") Nodejs
          a.p-2(href="https://webpack.js.org") Webpack
          a.p-2(href="https://vuejs.org") Vue.js
      .flex.row.links.mb-5
        .flex
          a(href="https://github.com/yenesey/bogachevo") код на GitHub
</template>

<script>
export default {}
</script>

<style lang="scss">
footer {
  flex: 1 0 auto;
  padding: .1rem;
  background-color: $HERO-BK-COLOR;
  justify-content: space-around;
  max-height: 53px;
}

.links {
  align-content: center; //v
  justify-content: center; // h
  font-size:0.95rem;

  a {
    color: $NAV-ITEM-COLOR;
    @include animated-link($NAV-ITEM-COLOR, rgb(144, 180, 226))
  }

  span {
    color: $NAV-ITEM-COLOR;
  }
}
</style>
